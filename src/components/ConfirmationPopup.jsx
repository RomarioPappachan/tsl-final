/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from 'axios'
import { useEffect } from 'react';
const ConfirmationPopup = ({setEdit, details, otp, setUsers, setUserStatusErr,allPopupState,setAllPopupState}) => {


useEffect(()=>{
if(!allPopupState){
  setAllPopupState(true)
}
},[])

function submitEvent() {
  console.log('submit');
  axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/registerUser`, details)
    .then((res) => {
      console.log(res,'line 18');
      if (res.data) {
        setUsers(false)
        setEdit(false);
        otp(true);
      }
    })
    .catch((error) => {
      // Handle the error, log or display a message
      console.error('Error during registration:', error.response.data);
      if(error.response.data){
        otp(false)
        setEdit(false)
        setUserStatusErr({flag:`${error.response.data.flag}`,message:`${error.response.data.message}`})
        setUsers(true)
      }
    });
}

  return (
    <div className='popup-container-wrapper'>
          <div className="w-100 h-100 container-fluid d-flex justify-content-center align-items-center">
              <div className="row pop-up">
                  <div className="col-12 pop-head d-flex justify-content-center align-items-center">
                    Confirm your Email & Phone number?
                  </div>

                  <div className="col-12 pop-content d-flex flex-column justify-content-center align-items-center">
                     
                     <p>{details.email}</p>
                      <span style={{"color": "red", "font-weight": "bold"}}> & </span>
                      <p>{details.phone}</p>
                      <span>Press edit to make changes</span>
                  </div>

                  <div className="col-12 pop-btn d-flex justify-content-around align-items-center">
                      
                      <button className="edit"  onClick = {()=>{setEdit(false);setAllPopupState(false)}}>Edit</button>
                      <button className="ok" onClick = {()=>submitEvent()}>Confirm</button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ConfirmationPopup