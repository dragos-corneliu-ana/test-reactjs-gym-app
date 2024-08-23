import { useEffect, useRef, useState } from 'react'
import { Hero } from './components/Hero'
import { Generator } from './components/Generator'
import { Workout } from './components/Workout'
import { SCHEMES, WORKOUTS } from './utils/swoldier'
import { generateWorkout } from './utils/functions'


function App() {
  const [poison, setPoison] = useState("individual")
  const [muscles, setMuscles] = useState([])
  const [goal, setGoal] = useState("growth_hypertrophy")
  const [workout, setWorkout] = useState(null)
  const refToGenerator = useRef(null)
  const refToWorkout = useRef(null)
  // the navigation behavior doesn't actually require refs --> one could scroll using window.location.href = '#workout', and the id of "workout" has to be passed to the respective element. Also: html {scroll-behavior: smooth} achieves smooth navigation after clicking buttons
  const [loadingWorkout, setLoadingWorkout] = useState(false)


  async function updateWorkout(){
    if (muscles.length < 1) {
      return
    }

    setLoadingWorkout(true)
    let newWorkout = generateWorkout({poison, muscles, goal})
    const result = await new Promise( (resolve, reject) => {
        setTimeout(()=> {
          resolve('...waited 2 seconds')
        }, 2000)
        // there is no reject in this case
    }
    )
    setWorkout(newWorkout)
    setLoadingWorkout(false)
  }
  
  useEffect(()=>{
    refToWorkout.current?.scrollIntoView({behavior:"smooth"})
  }, [workout, loadingWorkout])

  function scrollIntoView(){
    refToGenerator.current?.scrollIntoView({behavior:"smooth"})
  }

  return (
    <main className='min-h-screen flex flex-col gap-y-20  bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
      <Hero buttonFunc = {scrollIntoView}></Hero>
      <Generator 
        poison = {poison}
        setPoison = {setPoison}
        muscles = {muscles}
        setMuscles = {setMuscles}
        goal = {goal}
        setGoal = {setGoal}
        workout = {workout}
        setWorkout = {setWorkout}
        updateWorkout = {updateWorkout}
        ref = {refToGenerator}
        loadingWorkout = {loadingWorkout}
        setLoadingWorkout = {setLoadingWorkout}
      ></Generator>
        {( workout && !loadingWorkout) && <Workout ref={refToWorkout} workout = {workout}/>
        }
      {/*<Workout></Workout>*/}
    </main>
  )
}

export default App
