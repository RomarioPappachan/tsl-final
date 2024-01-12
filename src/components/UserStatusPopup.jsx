/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const UserStatusPopup = ({setUserStatusErr,setUsers,message,allPopupState,setAllPopupState}) => {

  return (
    <div className='popup-container-wrapper'>
        <div className="w-100 h-100 container-fluid d-flex justify-content-center align-items-center">
            <div className="row pop-up">
                <div className="col-12 pop-head d-flex justify-content-center align-items-center">
                  Registration Unsuccessful
                </div>

                <div className="col-12 pop-content d-flex flex-column justify-content-center align-items-center">
                    <p className="danger">{message.message}</p>
                </div>

                <div className="col-12 pop-btn d-flex justify-content-around">
                    <button className="ok"  onClick = {() => { setUsers(false); setAllPopupState(false) }}>OK</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserStatusPopup
