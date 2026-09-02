import{useState,useRef} from 'react';
import ResultModal from './ResultModal';
export default function TimerChallenge({title,targetTime}){

    const[timeRemaining,setTimeRemaining] = useState(targetTime*1000)
    const timer = useRef() // pointer returned by setTimeOut
    //USED REFS FOR STOREING PERSISTENT VALUE
    const dialog = useRef()

    const timerIsActive = timeRemaining>0 && timeRemaining<targetTime*1000

    //Timer expired
    if(timeRemaining<=0){
       clearInterval(timer.current)  
       dialog.current.open()
    }
    function handleStart(){ 
        timer.current = setInterval(()=>{
        setTimeRemaining(prevTimeRemaining => prevTimeRemaining-10) //so state gets updated on every 10 milli sceonds
       }, 10); //second to milli-seconds   
      
    
    }
    //Manually stopping the Timer
    function handleStop(){
        clearInterval(timer.current)  //to stop the timeout
        dialog.current.open()
    }

    function handleReset(){
        setTimeRemaining(targetTime*1000)
    }
    return(
        <>
       <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
       <section className="challenge">
        <h2>{title}</h2>
        
        <p className="challenge-time">
            {targetTime} second{targetTime>1?'s':''}
        </p>
        <p>
            <button onClick={timerIsActive? handleStop : handleStart}> 
               {timerIsActive ? 'Stop': 'Start'} Challenge
            </button>
        </p>
        <p className={timerIsActive ? 'active' :'undefined'}>
            {timerIsActive  ? 'Time is running...' : 'Timer is  Inactive'}
        </p>
       </section>
       </> 
    )
}