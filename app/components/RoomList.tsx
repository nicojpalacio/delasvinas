'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Tabs, TabsList, TabsTrigger } from '@/app/components/ui/tabs'

const RoomList = ({ rooms }: { rooms: any }) => {

    const [roomType, setroomType] = useState('all')
    const [filteredRooms, setfilteredRooms] = useState([])

    useEffect(() => {
        const filtered = rooms.data?.filter((room: any) => {
            return roomType === 'all' ? rooms : roomType === room.attributes.type;
        })
        setfilteredRooms(filtered)

    }, [roomType])


    return (
        <section className='py-16 min-h-[90vh]'>
            <div className='flex flex-col items-center'>
                <h2 className='h2 mb-8'>Habitaciones</h2>
            </div>

            <Tabs defaultValue='all' className='w-[240px] lg:w-[540px] h-[200px] lg:h-auto mb-8 mx-auto'>
                <TabsList className='w-full h-full lg:h-[46px] flex flex-col lg:flex-row'>
                    <TabsTrigger className='w-full h-full' value='all' onClick={() => { setroomType('all') }}>All</TabsTrigger>
                    <TabsTrigger className='w-full h-full' value='single' onClick={() => { setroomType('single') }}>Single</TabsTrigger>
                    <TabsTrigger className='w-full h-full' value='double' onClick={() => { setroomType('double') }}>Double</TabsTrigger>
                    <TabsTrigger className='w-full h-full' value='extended' onClick={() => { setroomType('extended') }}>Extended</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {filteredRooms.map((room: any) => {
                    const imgURL = `${room.attributes.image.data?.attributes.url}`
                    console.log(imgURL)

                    return <div key={room.id}>
                        <Link href={`/room/${room.id}`}>
                            <div className='relative w-full h-[200px] overflow-hidden mb-6 '>
                                <Image
                                    src={imgURL}
                                    alt={room.attributes.title}
                                    
                                    layout='fill' // Adjust as needed
                                    className='object-cover'
                                // Consider adding error handling and placeholder image
                                />
                            </div>
                        </Link>
                        <div className="h-[134px]">
                            <div className="flex items-center justify-between mb-6">
                                <div>Capacidad - {room.attributes.capacity} personas</div>
                            </div>
                            <Link href={`/room/${room.id}`}>
                                <h3 className='h3'>{room.attributes.title}</h3>
                            </Link>
                            <p className='h3 font-secondary font-medium text-accent mb-4'>${room.attributes.price} {' '}<span className='text-base text-secondary'> /noche</span></p>
                        </div>
                    </div>
                })}
            </div>
        </section>
    )
}

export default RoomList