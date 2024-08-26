import Reservation from "@/app/components/Reservation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image"
import { TbArrowsMaximize, TbUsers } from "react-icons/tb"

const getRoomData = async ({ params }: { params: any }) => {
  const res = await fetch(`https://backdelasvinas.onrender.com/api/rooms/${params.id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
    next: {
      revalidate: 0,
    },
  })
  return await res.json()
}

const getReservationData = async () => {
  const res = await fetch(`https://backdelasvinas.onrender.com/api/reservations?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
    next: {
      revalidate: 0,
    },
  })
  return await res.json()
}

const RoomDetails = async ({ params }: { params: any }) => {
  const room = await getRoomData({ params })
  const reservations = await getReservationData()
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()
  const userData = await getUser()

  const imgURL = `${room.data.attributes.image.data.attributes.url}`

  return (
    <section className="min-h-[80vh]">
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row lg:gap-12 h-full">
          <div className="flex-1">
            <div className="relative h-[360px] lg:h-[420px] mb-8">
              <Image src={imgURL} fill className="object-cover" alt="" />
            </div>
            <div className="flex flex-1 flex-col mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="h3">{room.data.attributes.title}</h3>
                <p className="h3 font-secondary font-medium text-accent">${room.data.attributes.price}
                  <span className="text-base text-secondary"> / noche</span>
                </p>
              </div>
              {/* info */}
              <div className="flex items-center gap-8 mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-2xl text-accent">
                    <TbArrowsMaximize />
                  </div>
                  <p>{room.data.attributes.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl text-accent">
                    <TbUsers />
                  </div>
                  <p>{room.data.attributes.capacity} personas</p>
                </div>
              </div>
              <p>{room.data.attributes.description}</p>
            </div>
          </div>
          <div className="w-full lg:max-w-[360px] h-max">
            <Reservation reservations={reservations} room={room} isUserAuthenticated={isUserAuthenticated} userData={userData} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoomDetails;