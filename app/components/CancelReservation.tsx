'use client'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const deleteData = async (url: string)=>{
    const options = {
        
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            'content-Type': 'application/json'
        }
    }
        try {
            const res = await fetch(url, options)
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }

}
const CancelReservation = ({ reservation }: { reservation: any }) => {
    const router = useRouter()
    const cancelReservation = (id:number)=>{
        deleteData(`https://backdelasvinas.onrender.com/api/reservations/${id}`)
        router.refresh()
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size='md'>Cancelar reserva</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Estas seguro de eliminar la reserva?</AlertDialogTitle>
                    <AlertDialogDescription>No podras recuperar la misma en caso de que sea reservada luego</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>cancelReservation(reservation.id)}>Eliminar reserva</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CancelReservation