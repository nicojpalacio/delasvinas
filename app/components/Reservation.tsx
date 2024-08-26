'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils"
import { format, isPast } from 'date-fns';
import { CalendarIcon, Calendar as calendarIcon } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import AlertMessage from "./AlertMessage";
import { useRouter } from "next/navigation";

const postData = async (url: string, data: object) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`
        },
        body: JSON.stringify(data),
    }
    try {
        const res = await fetch(url, options)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}


const Reservation = ({ reservations, room, isUserAuthenticated, userData }: { reservations: any; room: any; isUserAuthenticated: boolean; userData: any }) => {
    const [checkInDate, setCheckInDate] = useState<Date>()
    const [checkOutDate, setCheckOutDate] = useState<Date>()
    const [alertMessage, setAlertMessage] = useState<{
        message: string;
        type: 'error' | 'succes' | null;
    } | null>(null)

    const router = useRouter();
    
    const formatDateForStrapi = (date: Date) => {
        return format(date, 'yyy-MM-dd')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
           return setAlertMessage(null)
        }, 3000)
        return () => clearTimeout(timer)
    }, [alertMessage])

    const saveReservation = () => {
        if (!checkInDate || !checkOutDate) {
           return setAlertMessage({
                message: 'Por favor seleccionar fecha de Check in y Check Out',
                type: 'error',
            })
        }
        if (checkInDate.getTime() === checkOutDate.getTime()) {
            return setAlertMessage({
                message: 'Las fechas de Check In y Check Out no pueden ser las mismas',
                type: 'error',
            })
        }

        if (checkInDate.getTime() > checkOutDate.getTime()) {
            return setAlertMessage({
                message: 'La fecha de Check In no puede ser despues del Check Out',
                type: 'error',
            })
        }

        // filter reservations for the current room and check if any reservation overlaps with the selected dates
        const isReserved = reservations.data
            .filter(
                (item: any) => item.attributes.room.data.id === room.data.id //filter reservations for the current room
            )
            .some((item: any) => {
                //check if any reservation overlaps with the selected dates
                const existingCheckIn = new Date(item.attributes.checkIn).setHours(
                    0,
                    0,
                    0,
                    0
                ); // convert existing chek in date to midnight
                const existingCheckOut = new Date(item.attributes.checkOut).setHours(
                    0,
                    0,
                    0,
                    0
                ); // convert existing chek out date to midnight

                // convert selected check in date to midnight
                const checkInTime = checkInDate.setHours(0, 0, 0, 0)

                // convert selected check out date to midnight
                const checkOutTime = checkOutDate.setHours(0, 0, 0, 0)

                // check if the room is reserved betwwn the check in and check out dates
                const isOverlapping = existingCheckIn <= checkOutTime && existingCheckOut >= checkInTime;

                return isOverlapping; // return true if any reservation overlaps with the selected dates 
            })


        //if the room is reserved, log a message; otherwsie, proceed with the reservation

        if (isReserved) {
            setAlertMessage({
                message: "Habitacion se encuentra reservada en las fechas solicitadas",
                type: 'error'
            })
        } else {

            const data = {
                data: {
                    lastname: userData.family_name,
                    firstname: userData.given_name,
                    email: userData.email,
                    checkIn: checkInDate ? formatDateForStrapi(checkInDate) : null,
                    checkOut: checkOutDate ? formatDateForStrapi(checkOutDate) : null,
                    room: room.data.id,
                },
            }
            postData('https://backdelasvinas.onrender.com/api/reservations', data);
            setAlertMessage({
                message: "Habitacion reservada exitosamente",
                type: 'succes'
            })
            // refresh the page to reflect the updates reservation status
            router.refresh();
        }


    }
    return (
        <div>
            <div className="bg-slate-200 h-[320px] mb-4">
                <div className="bg-accent py-4 text-center relative mb-2">
                    <h4 className="text-xl text-white">Reserva tu habitacion</h4>
                </div>
                <div className="flex flex-col gap-4 w-full py-6 px-8">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"default"}
                                size='md'
                                className={cn(
                                    'w-full flex justify-start text-left font-semibold',
                                    !checkInDate && 'text-secondary'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkInDate ? format(checkInDate, 'PPP') : <span>Check In</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={checkInDate}
                                onSelect={setCheckInDate}
                                initialFocus
                                disabled={isPast}
                            />
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"default"}
                                size='md'
                                className={cn(
                                    'w-full flex justify-start text-left font-semibold',
                                    !checkOutDate && 'text-secondary'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkOutDate ? format(checkOutDate, 'PPP') : <span>Check out</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={checkOutDate}
                                onSelect={setCheckOutDate}
                                initialFocus
                                disabled={isPast}
                            />
                        </PopoverContent>
                    </Popover>

                    {isUserAuthenticated ? (<Button onClick={() => saveReservation()}>Confirmar Reserva</Button>) : (<LoginLink><Button className="w-full" size='md'>Confirmar Reserva</Button></LoginLink>)}
                </div>
            </div>
            {alertMessage && <AlertMessage message={alertMessage.message} type={alertMessage.type} />}
        </div>
    )
}

export default Reservation