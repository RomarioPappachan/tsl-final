import React, { useEffect } from 'react'

// eslint-disable-next-line react/prop-types, no-unused-vars
const InvalidAgePopup = ({ setInvalidAge, allPopupState, setAllPopupState }) => {


    useEffect(() => {
        if(!allPopupState){
          setAllPopupState(true)
        }
    },[]);
    

  return (

     <div className='popup-container-wrapper'>
          <div className="w-100 h-100 container-fluid d-flex justify-content-center align-items-center">
              <div className="row pop-up" style={{height: "240px"}}>
                  <div className="col-12 pop-head d-flex justify-content-center align-items-center bg-danger">
                     Invalid Age
                  </div>

                  <div className="col-12 pop-content d-flex flex-column justify-content-center align-items-center">
                     
                      <span style={{fontSize: "1rem", fontWeight: "500"}}>You should be above 5 years old.</span>
                  </div>

                  <div className="col-12 pop-btn d-flex justify-content-around align-items-center">
                      <button className="edit w-50" onClick = {()=>{ setInvalidAge(false); setAllPopupState(false) }}>Close</button>
                      {/* <button className="edit"  onClick = {()=>{setconfirmAge(false); setAllPopupState(false)}}>No</button> */}
                  </div>
              </div>
          </div>
      </div>

  )
}

export default InvalidAgePopup