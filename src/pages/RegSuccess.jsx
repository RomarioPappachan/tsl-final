/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import FooterSuccess from "../components/FooterSuccess";
import "../regSuccess.css";
import axios from "axios";


import io from 'socket.io-client'


const socket = io.connect(`${import.meta.env.VITE_SOCKET_HOST}`)


const RegSuccess = () => {

  const [usersList, setUsers] = useState([])
  const [usersCount, setUsersCount] = useState(0)
  

  useEffect(()=>{
    const socketInterval = function (){
           
      socket.emit('fetchusers',()=>{
         
      })
  }
  socket.on('usersupdate',(data)=>{
      setUsersCount(data.results[0].count)
  })
  setInterval(socketInterval,3000)
    const userId = localStorage.getItem("user_id")


axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/listName/${userId}`).then((res)=>{
  console.log(res.data,'qwert')
  if(res.data){
  setUsers(res.data)
  }
})

setTimeout(()=>window.location.href="https://wa.me/+919008290027",30000)


return ()=>{
  clearInterval(socketInterval)
}
  },[])
  return (
    <div className="success-page-container m-0 p-0">

      <div className="row m-0 mt-2">
        <div className="col-sm-2 success-logo-column">
          <img className="success-logo" src="./images/starlife-logo.png" alt="success-logo" />
        </div>
        <div className="success-head col-sm-8">
          <h1 className="success-title">Thank you for registering.</h1>
          <p className="success-content"> You can now see your name under WaitingList.  Members in NewList are those who have  attended the first introduction class.  
            In order to share the introduction zoom class details on your whatsapp, kindly press the WhatsApp icon below . 
            Happy to see you in our meditation family.
          </p>
        </div>
        <div className="col-sm-2">


        </div>
      </div>

      <div className="whatsapp-message">
        Please click here 
        <a href="https://wa.me/+919008290027" className="whatsapp-link">
          <img className="whatsapp-icon" src="./images/ripple.gif" alt="whatsapp-icon"/>
        </a> and send a 'Hi' for registration completion.
      </div>


      <div className="success-list-wrap m-0 mt-4 p-0">
    
        { usersList.map((i,ind) => {
          return (
            <div key={ind + 1} className="row g-0 m-0 success-list-row">
              <div className="col-sm-6 col-0"></div>
              <div className="col-sm-6 success-list-column">
                <div className="success-list-number">{ ind+1 }</div>
                <p className="success-list-name mb-0">{ i.name }</p>
              </div>
            </div> )
          })
        }


      </div>
    


      <FooterSuccess usersCount = {usersCount}/>

    </div>  

  )
}

export default RegSuccess