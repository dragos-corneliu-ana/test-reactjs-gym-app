import React from 'react'
import { Button } from './Button'

export const Hero = (props) => {
  const {buttonFunc} = props
  return (
    <div className='min-h-screen flex flex-col justify-center gap-10 items-center text-center max-w-[900px] w-full mx-auto p-4'>
      <div className='flex flex-col gap-2'>
        <p>IT'S TIME TO GET</p>
        <h1 className='uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>SWOLE<span className="text-blue-400">NORMOUS</span></h1>
      </div>
      <p className="text-xs sm:text-sm md:text-base text-center font-light ">
        I hereby acknowledgement that I may become <span className='text-blue-400 font-medium'>unbelievably swolenormous</span> and accept all risks of becoming the local <span className='text-blue-400 font-medium'>mass montrosity</span>, 
        afflicted with severe body dismorphia, unable to fit through doors.</p>
        <Button buttonText="Accept & Begin" func={buttonFunc}/>
    </div>
  )
}
