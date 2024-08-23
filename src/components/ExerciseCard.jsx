import React, { useState } from 'react'

export const ExerciseCard = (props) => {
    const {exercise, exerciseIndex} = props 
    const [setsCompleted, setSetsCompleted] = useState(0)
    const maxSets = 5
    const [showDescription, setShowDescription] = useState(false)
    
    console.log(exercise.description.split("___"))


    return (
    <div className='bg-slate-950 rounded-lg flex flex-col p-4 gap-6'>
        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
            <p className='hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-slate-400'>0{exerciseIndex+1}</p>
            <h2 className='capitalize text-lg sm:text-xl md:text-2xl'>{exercise.name.replaceAll("_", " ")}</h2>
            <p className='capitalize text-xs sm:text-sm text-slate-400'>{exercise.type}</p>
        </div>
        <div className='flex flex-col text-sm gap-1'>
            <p className='text-slate-400'>Muscle groups</p>
            <h2 className='capitalize'>{exercise.muscles[0]}</h2>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {["reps", "rest", "tempo"].map((info, infoIndex) => {
                return (
                    <div key={infoIndex} className='flex flex-col items-start border border-solid border-slate-900 rounded-md p-2'>
                        <h2 className='capitalize text-slate-400 text-sm'>{info === "reps" ? exercise.unit :info}</h2>
                        <p className=''>{exercise[info]}</p>
                    </div>
                )
            })}
            <button className='flex flex-col items-start border border-solid border-blue-400 hover:border-blue-600 duration-200 rounded-md p-2' onClick={()=> {
                if (setsCompleted < maxSets){
                    setSetsCompleted(setsCompleted + 1)
                    return
                }
                setSetsCompleted(0)
            }}>
                <h2 className='capitalize text-slate-400 text-sm'>Sets</h2>
                <p className=''>{setsCompleted}/{maxSets}</p>
            </button>
        </div>
        <div className='bg-slate-900 flex flex-col rounded '>
            <button onClick= {()=> {
                setShowDescription(!showDescription)
            }} className='flex justify-between items-center p-2'>
                <p>Description</p>
                {showDescription ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
            </button>
            <div className='h-[1px] bg-slate-950'></div>
            {showDescription && <ul className='text-sm list-disc list-inside p-2'>
                {exercise.description.split('___').map((bullet, bulletIndex) => {
                    return (<li key={bulletIndex}>{bullet}</li>)
                })}
                </ul>}
        </div>
    </div>
    )
}
