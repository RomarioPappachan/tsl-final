/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect ,useState} from "react"


const SuccessCard = ({ setConfirmPopup, data ,sendEmail}) => {

    const [expiry,setExpiry] = useState({})
    
    console.log(data.DOJ.split('T')[0]);

    const joinDate = data.DOJ.split('T')[0];
    const dateOfJoining = joinDate.split('-');
    const yearOfJoining = dateOfJoining[0];
    const monthOfJoining = dateOfJoining[1];
    const dayOfJoining = dateOfJoining[2];
    
    console.log(yearOfJoining);

useEffect(()=>{

    axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/send-email`,{to:sendEmail}).then((res)=>{
        console.log('email sended successfully');
    }).catch((err)=>{
        console.log('error from success card 123',err);
        
    })
    try {
      const date = data.expiredDate.split('T')[0].split('-');
      const year = date[0]
      const month = date[1]
      const day = date[2]
    
      setExpiry({ day:Number(day), month:Number(month), year:Number(year)+1 })
      localStorage.setItem('user_id',data.id)
    }
    catch(err){

    }
},[])
  return (
    <div className='popup-container-wrapper'>
        <div className='w-100 h-100 container-fluid d-flex justify-content-center align-items-center'>
            <div className="row reg-success-card p-3">
                <div className="col-12 reg-success-card-head d-flex justify-content-between align-items-center">
                    <div className="reg-card-number">
                        <p>Card Number</p>
                        <h1>{data.userId}</h1>
                    </div>

                    <img className="reg-card-logo" src="./images/thasmai-card-logo.png" alt="Thasmai logo" />
                </div>

                <div className="col-12 reg-success-card-content d-flex flex-column justify-content-center align-items-center">
                    <img className="chip" src="images/chip.png" alt="chip" />
                    <div>

                        <img className="reg-card-star-life-logo" src="./images/star-life-logo-gold.png" alt="star-life-img"/>
                        <h3 className="reg-card-success-message">Registration Successful</h3>
                        <p className="reg-card-contact-number">
                            <span>Contact: +91 9008290027</span>
                        </p>


                        <a className="success-page-link" href="/registrationSuccess">OK</a>
                    </div>
                </div>

                <div className="col-12 reg-success-card-footer d-flex justify-content-between align-items-center">
                    <div className="card-holder-group">
                        <div className="card-holder-name">
                            <p>Cardholder Name</p>
                            <h2>{data.first_name} {data.last_name}</h2>
                            {/* <h2>ALBIN ANTO DEVASIA</h2> */}
                            <p>DOJ: { dayOfJoining + "/" + monthOfJoining + "/" + yearOfJoining }</p>
                        </div>
                    </div>

                    <div className="reg-card-validity">

                        <p>VALID: { expiry.day}/{expiry.month}/{expiry.year }</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SuccessCard