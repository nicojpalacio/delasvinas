import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"

const getUserReservations = async (userEmail: any) => {
  const res = await fetch(`https://backdelasvinas.onrender.com/api/reservations?[filters][email][$eq]=${userEmail}&populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
    next: {
      revalidate: 0
    }
  })
  return await res.json()
}

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import CancelReservation from "../components/CancelReservation"

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userReservations = await getUserReservations(user?.email);
  console.log(userReservations);

  return (
    <section className='min-h-[80vh]'>
      <div className="container mx-auto py-8 h-full">
        <h3 className="h3 font-bold mb-12 border-b pb-4 text-center lg:text-left">
          Mis Reservas
        </h3>
        <div className="flex flex-col gap-8 h-full">
          {userReservations.data.length < 1 ? (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <p className="text-xl text-center text-secondary/80 mb-4">No tienes ninguna reserva</p>
            </div>
          ) : (
            userReservations.data.map((reservation: any) => {

              return <div key={reservation.id} className="bg-tertiary py-8 px-12">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <h3 className="text-2xl font-medium w-[200px] text-center lg:text">{reservation.attributes.room.data.attributes.title}</h3>
                  <div className="flex flex-col lg:flex-row gap-2 lg:w-[400px]">
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-accent font-bold uppercase tracking-[2px]">desde:</span>
                      <span className="text-secondary font-semibold">
                      {format(reservation.attributes.checkIn,'PPP')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-accent font-bold uppercase tracking-[2px]">hasta:</span>
                      <span className="text-secondary font-semibold">
                        {format(reservation.attributes.checkOut,'PPP')}
                      </span>
                    </div>
                  </div>
                  <CancelReservation reservation={reservation}/>
                </div>
              </div>
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard