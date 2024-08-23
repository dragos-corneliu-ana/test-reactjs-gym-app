import React, { forwardRef, useState } from 'react'
import { SectionWrapper } from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'
import { Button } from './Button'
import { generateWorkout } from '../utils/functions'



function Header(props){
  const {index, title, description} = props
  return (
    <div className='flex flex-col items-center gap-4'>
         <div className='flex items-center justify-center gap-2'>
              <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
              <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
         </div>
         <p className='text-sm sm:text-base mx-auto'>{description}</p>
      </div>
  )
}


export const Generator = forwardRef((props, ref) => {
  const {poison, muscles, goal, workout, setPoison , setMuscles , setGoal, setWorkout, loadingWorkout, setLoadingWorkout, updateWorkout} = props
  const poisonGroupOptions = (poison === "individual" ? WORKOUTS["individual"] : Object.keys(WORKOUTS[poison]))
  const [poisonGroup, setPoisonGroup] = useState(poisonGroupOptions)
  const [showSelect, setShowSelect] = useState(false)


  function handleMuscleToggle(muscleGroup) {
    if (muscles.includes(muscleGroup)){
      setMuscles(muscles.reduce((newMuscleArr, currMuscle) => {
        if (currMuscle != muscleGroup) {
          return newMuscleArr.concat([currMuscle])
        }
        return newMuscleArr
      }, []))
      return
    }
    
    if (poison != "individual"){
      setMuscles([muscleGroup])
      setShowSelect(!showSelect)
      return
    }
    
    if (muscles.length < 3 ){
      if (muscles.length == 2){
        setShowSelect(!showSelect)
      }
      setMuscles(muscles.concat([muscleGroup]))
      return
    }  

    setShowSelect(!showSelect)
  }

  return (
    <>
        <SectionWrapper
            header = {"generate your workout"}
            title = {["It\'s", "Huge", "o\'clock"]}
            className='relative py-2'
            ref = {ref}
            onClick = {() => {  
              setShowSelect(false)
            }}
            >
              <Header index={'01'} title={'Pick your Poison'} description="Select the workout you wish to endure."/>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {Object.keys(WORKOUTS).map((type, typeInd)=> {
                  return (
                    <button key={typeInd} onClick={()=>{
                      setShowSelect(false)
                      setMuscles([])
                      setPoison(type)
                      type === "individual" ? setPoisonGroup(WORKOUTS["individual"]) : setPoisonGroup(Object.keys(WORKOUTS[type]))
                    }} className={'bg-slate-950 hover:border-blue-600 duration-500 py-3 px-4 rounded-lg ' + (type === poison ? "border border-blue-600" : "border border-transparent")}>
                      <p className='capitalize'>{type.replaceAll('_',' ')}</p>
                    </button>
                  )
                })}
              </div>
              <Header index={'02'} title={'Lock on targets'} description="Select the muscles judged for annihilation."/>
              <div className={'relative bg-slate-950 flex flex-col w-full ' + (showSelect ? "rounded-t-md" : "rounded-md")}>
                <button className={'relative p-3 flex items-center justify-center ' +  (showSelect ? 'border-b border-b-slate-400 border-opacity-15' : 'border border-solid border-blue-600 rounded-md')} onClick={(e)=> {
                  e.stopPropagation(); // stops the propagation of the onClick event of the outer div
                  setShowSelect(!showSelect)
                }}>
                  <p className='capitalize'>{muscles.length>0 ? muscles.join(' & ') : ("Select muscle groups" + (poison === "individual" ? " (up to 3 muscles)" : ""))}</p>
                  <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
                </button>
                {showSelect && (
                  <div className='absolute left-0 top-full w-full bg-slate-950 flex flex-col justify-center items-center gap-4 duration-200 rounded-b-md py-1 overflow-scroll max-h-60'>
                    {showSelect && poisonGroup.map((muscleGroup, muscleGroupIndex) => {
                      return (
                        <button key={muscleGroupIndex} onClick={(e)=> {
                          e.stopPropagation()
                          handleMuscleToggle(muscleGroup)                         
                        }} className={'' + (muscles.includes(muscleGroup) ? 'text-blue-400' : 'hover:text-blue-400 duration-300')}>
                          <p className='capitalize'>{muscleGroup}</p>
                        </button>
                        )
                        }
                      )
                    }       
                  </div>
                )
                }
              </div>
              <Header index={'03'} title={'Become Juggernaut'} description="Select your ultimate objective."/>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'>
                {Object.keys(SCHEMES).map((scheme, schemeInd)=> {
                  return (
                    <button key={schemeInd} onClick={()=>{
                      setGoal(scheme)
                    }} className={'bg-slate-950 hover:border-blue-600 duration-500 py-3 px-4 rounded-lg ' + (scheme === goal ? "border border-blue-600" : "border border-transparent")}>
                      <p className='capitalize'>{scheme.replaceAll('_',' ')}</p>
                    </button>
                  )
                })}
              </div>
              <div className='flex flex-col justify-center items-center mt-[-30px]'>
                <Button buttonText={(!loadingWorkout) ? "Formulate" : ""} func = {updateWorkout}>
                  {loadingWorkout ? <i className="fa-solid fa-gear animate-spin"></i> : <div></div>}
                </Button>
              </div>
              </SectionWrapper>
    </>
  )
})
