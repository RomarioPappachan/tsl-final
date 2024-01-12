/* eslint-disable react/prop-types */

import AudioPlay from './AudioPlay'
import RegistrationForm from './RegistrationForm'
import Footer from "./Footer"
// import ConfirmationPopup from './ConfirmationPopup';
import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';

import io from 'socket.io-client'


const socket = io.connect(`${import.meta.env.VITE_SOCKET_HOST}`)

const SlidingContainer = (props) => {
  const [usersCount,setUsersCount] = useState(0);
  const [allPopupState,setAllPopupState] = useState(false);




  useEffect(()=>{

    const socketInterval = function (){
           
      socket.emit('fetchusers',()=>{
         
      })
  }
  socket.on('usersupdate',(data)=>{
      setUsersCount(data.results[0].count)
  })
  setInterval(socketInterval,3000)

  return ()=>{
    clearInterval(socketInterval)
  }

  },[allPopupState]);


  const containerVariants = {
    hidden: {
      x: '100%',
      
    },
    visible: {
      x: '0%',
      opacity: 1,
      transition: { duration: 1, ease:'easeOut' },
    },
  };

  console.log(props);
// const main = document.getElementById("main-container")
  return (
   <>
   {allPopupState === true ?
   <motion.div
          className="sliding-container"
          variants={containerVariants}
          initial="hidden"
          animate={props.isClicked ? 'visible' : 'hidden'}
          style={{overflow:"hidden"}}
        >
   
    {/* Sliding Container  */}

    <div className={ props.isClicked && "login-container show-login" } id = "main-container" >
    
        {/* <div className = "parent-container container-fluid m-0 p-0"> */}

        <div className="row g-0 m-0 p-0">

            {/* Left column with image */}
            <div className="col-md-4 slide-column-img"></div>   


            {/* Right column with audio player, form and footer */}
            <div className="col-md-8 m-0 p-0 columns slide-column-form-container">
                   
                {/* Audio Progress Bar and Heading */}

                <AudioPlay language={props.language} />     

                <div className="parent-heading">Satyam vada | Dharmam chara</div>

                {/* Form parent container */}

                <RegistrationForm setUsersCount={setUsersCount} allPopupState = {allPopupState} setAllPopupState = {setAllPopupState}/>

                <Footer usersCount = {usersCount}/>
            </div>
        </div>


    </div>

    
    </motion.div> :  <motion.div
          className="sliding-container"
          variants={containerVariants}
          initial="hidden"
          animate={props.isClicked ? 'visible' : 'hidden'}
          
        >
   
    {/* Sliding Container  */}

    <div className={ props.isClicked && "login-container show-login" } id = "main-container" >
    
        {/* <div className = "parent-container container-fluid m-0 p-0"> */}

        <div className="row g-0 m-0 p-0" style={{ minHeight: "100%", backgroundColor: "none"}}>

            {/* Left column with image */}
            <div className="col-md-4 slide-column-img"></div>   


            {/* Right column with audio player, form and footer */}
            <div className="col-md-8 m-0 p-0 columns slide-column-form-container">
                   
                {/* Audio Progress Bar and Heading */}

                <AudioPlay language={props.language} />     

                <div className="parent-heading">Satyam vada | Dharmam chara</div>

                {/* Form parent container */}

                <RegistrationForm setUsersCount={setUsersCount} allPopupState = {allPopupState} setAllPopupState = {setAllPopupState}/>

                <Footer usersCount = {usersCount}/>
            </div>
        </div>


    </div>
    </motion.div> 
   }
    </>
  )
}

export default SlidingContainer