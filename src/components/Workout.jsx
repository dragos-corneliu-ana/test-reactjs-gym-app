import React, { forwardRef } from 'react'
import { SectionWrapper } from './SectionWrapper'
import { ExerciseCard } from './ExerciseCard'

export const Workout = forwardRef((props, ref) => {
  const {workout} = props
  
  return (
  <SectionWrapper
            header = {"Welcome to"}
            title = {["The", "Danger", "zone"]}
            className='relative py-2'
            ref={ref}
  >
  <div className='flex flex-col gap-6 max-w-[700px] mx-auto text-xs sm:text-sm px-4 text-slate-400'>
    <p><span className='font-semibold'>*Note</span> - <span className='text-blue-400'>reps</span> is the number of repetitions, <span className='text-blue-400'>rest</span> is specified in seconds, and <span className='text-blue-400'>tempo</span> is the number of seconds for each movement phase in the order of eccentric - isometric - concentric (or down - pause - up). </p>
    <p>For <span className='text-blue-400'>weight selection</span>, choose a weight that allows you to complete the repetitions with minimal sacrifice to form. </p>
    <p>Happy lifting!</p>
  </div>
  {workout?.map((exercise, exerciseIndex) => {
    return (
      <ExerciseCard 
       exercise = {exercise}
       exerciseIndex = {exerciseIndex}
       key = {exerciseIndex}
      />
    )
  })}
  </SectionWrapper>
  )
})
