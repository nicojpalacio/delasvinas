import React from 'react'
import RoomList from './RoomList'
const getRooms = async()=>{
    const res = await fetch(`https://backdelasvinas.onrender.com/api/rooms?populate=*`,{
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },

        next:{
            revalidate:0,
        },
    })
    return await res.json()
}


const Rooms = async() => {
  const rooms= await getRooms()
  
    return (
    <section>
        <div className="container mx-auto">
            <RoomList rooms = {rooms}/>
        </div>
    </section>
  )
}

export default Rooms