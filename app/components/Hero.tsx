import React from 'react'

const Hero = () => {
  return (
    <section className='h-[60vh] lg:h-[80vh] bg-hero bg-cover bg-center bg-no-repeat'>
        <div className="container mx-auto h-full flex justify-center items-end">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-white text-center max-w-[800px] mb-8 text-4xl md:text-5xl lg:text-[64px] uppercase tracking-[2px] leading-tight font-primary">
              Veni a conocer los valles
            </h1>
          </div>
        </div>
    </section>
  )
}

export default Hero