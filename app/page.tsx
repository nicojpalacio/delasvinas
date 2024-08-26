import React from 'react'
import Hero from './components/Hero'
import Divider from './components/Divider'
import MaridajeSection from './components/MaridajeSection'
import GeneralSection from './components/GeneralSection'

const page = () => {
  return (
    <div>
      <Hero/>
      <Divider/>
      <MaridajeSection/>
      <GeneralSection/>
    </div>
  )
}

export default page