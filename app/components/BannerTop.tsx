'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'

const BannerTop = () => {
  
  const dataCarrousel=[
    {
        id:1,
        title:"30% de descuento",
        description:"Con la reserva de una habitacion por mas de 5 dias aprovecha un 30% off",
        link:"/"
    },
    {
        id:2,
        title:"Degusta nustros exquisitos vinos",
        description:"Inscribite a nuestros maridajes, envia un whatsapp al 12345678978",
        link:"/"
    },
    {
        id:3,
        title:"50% off en vinos",
        description:"A partir de la compra de 5 cajas te llevas a mitad de precio cada una",
        link:"/"
    },
  ]  
  
    return (
    <div className='bg-yellow-50 dark:bg-primary'>
        <Carousel className='w-full max-w-4xl mx-auto'
        plugins={[
            Autoplay({
                delay:3000
            })
        ]}>
        <CarouselContent>
        {dataCarrousel.map(({id, title, link, description}) => (
          <CarouselItem key={id} className=''>
            <div>
                <Card className='shadow-none border-none bg-transparent'>
                    <CardContent className='flex flex-col justify-center p-2 items-center'>
                        <p className='sm:text-lg text-wrap dark:text-secondary'>{title}</p>
                        <p className='text-xs sm:text-sm text-wrap dark:text-secondary'>{description}</p>
                    </CardContent>
                </Card>
            </div>
          </CarouselItem>
        ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default BannerTop