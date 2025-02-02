import React from 'react'
import Headers from '../components/Headers'
import Hero from "../components/Hero"
import SelectAction from '@/components/SelectAction'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div>
      <Headers/>
      <div className=" pt-[4rem]">

      <Hero/>

      <SelectAction/>

      <Footer/>
      </div>
      
    </div>
  )
}

export default page