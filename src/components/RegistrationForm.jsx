/* eslint-disable react/prop-types */
   

   
   
   import io from 'socket.io-client'


   const socket = io.connect(`${import.meta.env.VITE_SOCKET_HOST}`)
   import { useForm } from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import ResponsiveDatePickers from "./ResponsiveDatePickers";
    import MultipleSelectPlaceholder from "./MultipleSelectPlaceholder";
    import { useEffect, useRef, useState } from "react";
    import axios from "axios"





import ConfirmationPopup from "./ConfirmationPopup";
import OtpPopup from "./OtpPopup";
import SuccessCard from "./SuccessCard";
import UserStatusPopup from './UserStatusPopup';
import AgeConfirmationPopup from './AgeConfirmation';
import InvalidAgePopup from './InvalidAgePopup';
    const RegistrationForm = ({setUsersCount,allPopupState,setAllPopupState}) => {
    const countryRef = useRef()
    // Default id for India
    const defaultCountryId = 151;
    const [confirmAge, setconfirmAge] = useState(false)
    const [invalidAge, setInvalidAge] = useState(false)
    const [sendEmail,setSendEmail] = useState("")
    const [selectedGender, setSelectedGender] = useState("");
    const [existsError ,setExistsError] = useState({})
    const [userStatusState,setUserStatusState] = useState(false)
    const [langErr,setLangErr] = useState(false)
    const [doErr,setDoErr] = useState(false)
        const [updateddata,setData] = useState({})
        const [success,setSuccess] = useState(false)
    
        const [successData ,setSuccessData] = useState({})
        const [invalidOtp,setInvalidOtp] = useState(false)
        const [otppopup,setOtp] = useState(false)
        const [resendEnabled,setResend] = useState(false)
        const [specialCount, setSpecialCount] = useState(0);
        const [isExpanded, setIsExpanded] = useState(false);
        const [countries, setCountries] = useState([]);
        const [loading, setLoading] = useState(true);
        const [selectedCountryId, setSelectedCountryId] = useState(defaultCountryId);
        const [selectedCountryFlag, setSelectedCountryFlag] = useState("");
        const [selectedCountryPhonecode, setSelectedCountryPhonecode] = useState("");
        const [dob, setDob] = useState("");
        
        const [selectedLanguages, setSelectedLanguages] = useState([]);
        
        const[confirm,setConfirm] = useState(false)
        



        useEffect(() => {
         
        const socketInterval = function (){
           
            socket.emit('fetchusers',()=>{
               
            })
        }
        socket.on('usersupdate',(data)=>{
            setUsersCount(data.results[0].count)
        })
        setInterval(socketInterval,50000)
        const fetchData = async () => {
        try {
        const response = await axios.get(

            `${import.meta.env.VITE_BASE_URL}/api/user/countrieslist`
        );
        console.log(response.data,'res')
        setCountries(response.data);

        // Find the index of India in the countries array
        const indiaIndex = response.data.findIndex((country) => country.id === defaultCountryId);

        // Set India as the default country
        const defaultCountry = response.data[indiaIndex];
        setSelectedCountryId(defaultCountryId);
        setSelectedCountryFlag(defaultCountry ? defaultCountry.flag : "");
        setSelectedCountryPhonecode(defaultCountry ? defaultCountry.phonecode : "");

        setLoading(false);
        } catch (error) {
        console.error("Error fetching countries:", error.message);
        setLoading(false);
        }
    };

    fetchData();
  
    
    

    return ()=>{
        clearInterval(socketInterval)
    }
    }, [defaultCountryId]);




        const handleCountryChange = (event) => {
            const selectedId = parseInt(event.target.value, 10);
            setSelectedCountryId(selectedId);
        
            // Find the selected country object
            const selectedCountry = countries.find((country) => country.id === selectedId);
        
            // Set the flag image URL and code for the selected country
            setSelectedCountryFlag(selectedCountry ? selectedCountry.flag : "");
            setSelectedCountryPhonecode(selectedCountry ? selectedCountry.phonecode : "");
        };


        function expand() {
            setIsExpanded(true);
        }

        

        // Form Validation using YUP
        const schema = yup.object().shape({
            firstName : yup.string().required("First name is empty").matches("^[A-Za-z. ]+$","Name must not contain special characters."),
            secondName : yup.string().required("Last name is empty").matches("^[A-Za-z. ]+$","Name must not contain special characters."),
            email : yup.string().required("First name is empty").email("Email is not valid"),
            // languageName: yup.array().of(yup.string()).min(1, 'Please select at least one language').required('Please select one or more languages'),
            phone: yup.number().required("Phone number is Empty").max(9999999999, 'Enter a valid phone number').positive().integer(),
            reference: yup.string().test({
                name: 'atLeastOneReferenceSelected',
                message: 'Please select a reference option',
                test: function (value) {
                    return value !== undefined; // Ensure 'value' is not undefined
                },
            }).required("Reference cannot be empty"),
            // specialRemarks: yup.string().trim().min(1, 'Please enter your remarks'),
        });
    
    
        const { register, handleSubmit, formState : {errors}, setValue } = useForm({
            resolver : yupResolver(schema)
        });
        
         function onSubmit(data) {
            console.log('hi')
            const year = dob.$y
            const day = dob.$D
            const month = dob.$M
           
            const country = countries.filter((i)=>{
                return i.id === selectedCountryId
            })

            console.log(country,selectedGender,"line")
            setSendEmail(data.email)
            const updated_data = {...data, dob:`${day}-${month}-${year}`, languages:selectedLanguages, country_code : selectedCountryPhonecode, country:country[0].name, gender: selectedGender}


            if(!doErr && !langErr) {
        
                setData(updated_data)
                setConfirm(true)
            }

            console.log(updateddata,'updateddata')

        }
        

        function handleLanguageChange(event, value) {
            setSelectedLanguages(value);
            setValue('languageName', value, true); // Set the value in the form state
        }

        

        const handleTextareaChange = (e) => {
            // Update character count or perform other actions as needed
            const value = e.target.value;
            setSpecialCount(value.length);
        };

        function check(){
           
            setIsExpanded(false)
            console.log(dob)
            if(!dob){
                setDoErr(true)  
            } else {
                setDoErr(false)
            }

            if(selectedLanguages.length < 1){
                setLangErr(true)
            } else {
                setLangErr(false)
            }
        }


    return (
        
        <form className="w-100 m-0 form-container-wrapper" style={{minHeight:"100vh !important"}} onSubmit={(e)=>{e.preventDefault();handleSubmit(onSubmit)()}}>
            
            <div className="row g-4 container-fluid form-parent-container mx-0" >
                
                <div className="col-12">
                    <div className="row gx-4">
                        <div className="col-md-6 gy-4 form-input-container">
                            <input type="text" className='fname form-input-field w-100 h-100' {...register("firstName")} placeholder="First name" style = {{border:errors.firstName?"2px solid red":"none"}}/>
                            {errors.firstName && <span className='show-error '>{errors.firstName.message}</span>}
                        </div>
                        <div className="col-md-6 gy-4 form-input-container">
                            <input type="text" className="lname form-input-field w-100 h-100" {...register("secondName")} placeholder="Last name"style = {{border:errors.secondName?"2px solid red":"none"}}/>
                            {errors.secondName && <span className='show-error '>{errors.secondName.message}</span>}
                        </div>
                    </div>

                    <div className="row gx-4">
                        <div className="col-md-6 gy-4 form-input-container">
                            <input type="text" className="email form-input-field w-100 h-100" {...register("email")} placeholder="Email" style = {{border:errors.email || existsError.flag === "email"?"2px solid red":"none"}}/>
                            {errors.email && <span className='show-error '>Enter a valid email</span>}
                        </div>
                        <div className="col-md-6 gy-4 form-input-container">
                            <div className="row h-100">
                                <div className="col-8 h-100" style={{"background": "none"}}>
                                    {/* <input type="text" className="dob form-input-field w-100 h-100" placeholder="DOB"/> */}
                                    <ResponsiveDatePickers setDob={setDob} dob = {dob} register = {register} setTog = {setDoErr} setconfirmAge = {setconfirmAge} setInvalidAge = {setInvalidAge} />
                                </div>

                                <div className="col-4 h-100 d-flex">
                                    <div className="h-100 d-flex justify-content-center align-items-center">
                                        <div className="gender-wrapper w-50 h-100 d-flex flex-column justify-content-center align-items-center">
                                            <img src="./images/female.png" className="w-75 mb-1"/>
                                            <input className="gender-radio-button" type="radio" name="select" id="" value="female" onChange={(e) => {setSelectedGender(e.target.value)}}/>
                                        </div>
                                        <div className="gender-wrapper w-50 h-100 d-flex flex-column justify-content-center align-items-center">
                                            <img src="./images/male.png" className="w-75 mb-1" />
                                            <input className="gender-radio-button" type="radio" name="select" id="" value="male" onChange={(e) => {setSelectedGender(e.target.value)}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {doErr && <span className='show-error '>Select your date of birth</span>}
                            
                            {/* {(dob.length <= 0 || dob !== '111') && (dob === '111'&&<span className="show-error">Enter your date of birth</span>)} */}
                            {/* <span className="show-error text-end hide-error">Select a gender</span> */}
                        </div>
                    </div>

                    <div className="row gx-4">
                        <div className="col-md-6 gy-4 form-input-container">
                            <select
                                className="form-input-field w-100 h-100" ref = {countryRef}
                                // {...register("country")}
                                value={selectedCountryId}
                                onChange={handleCountryChange}
                            >
                                <option disabled value="">
                                    {loading ? "Loading countries..." : "Select a country"}
                                </option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            {/* {errors.country && <span className='show-error '>Select a country</span>} */}
                        </div>
                        <div className="col-md-6 gy-4 phone-code-n-number form-input-container">
                            <div className="row h-100 g-0 d-flex justify-content-between">
                                <div className="col-3 h-100 gx-0">
                                    <div className="h-100 pe-3">
                                        <div className="country-flag form-input-field w-100 h-100 d-flex justify-content-center align-items-center">
                                            <img className="country-flag-image" style = {{border: "0.5px solid #d9d9e3"}} src={selectedCountryFlag} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 h-100 gx-0">
                                    <div className="country-code form-input-field w-100 h-100 rounded-0 rounded-start d-flex justify-content-center align-items-center">
                                        {selectedCountryPhonecode}
                                    </div>
                                </div>
                                <div className="col-7 h-100 gx-0">
                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        name="phone"
                                        pattern="\d{10}"
                                        className="phone-number form-input-field w-100 h-100 rounded-0 rounded-end"
                                        {...register("phone")}
                                        onInput={(e) => {
                                            // Restrict the input length to 10 digits
                                            e.target.value = e.target.value.slice(0, 10);
                                        }}
                                        style = {{border:errors.phone || existsError.flag === "phone" ? "2px solid red" : "none"}} />
                                </div>
                            </div>
                            {errors.phone && <span className='show-error text-end'>Enter a valid phone number</span>}
                        </div>
                    </div>

                    <div className="row gx-4">
                        <div className="col-md-6 gy-4 form-input-container">
                            <div className="form-input-field w-100 h-100 d-flex justify-content-around" style = {{border : errors.reference ? "2px solid red" : "none"}}>
                                <div className="search-icon h-100 d-flex flex-column justify-content-center align-items-center">
                                🔍
                                </div>

                                <div className="reference-name d-flex flex-column justify-content-center align-items-center">
                                    Social media
                                    <input className="reference-radio-button" style={{"background" : "none"}} type="radio" name="reference" value="social_media" {...register("reference")}/>
                                </div>

                                <div className="reference-name d-flex flex-column justify-content-center align-items-center">
                                    Reference
                                    <input className="reference-radio-button" style={{"background" : "none"}} type="radio" name="reference" value="reference" {...register("reference")}/>
                                </div>

                                <div className="reference-name d-flex flex-column justify-content-center align-items-center">
                                    News
                                    <input className="reference-radio-button" style={{"background" : "none"}} type="radio" name="reference" value="news" {...register("reference")}/>
                                </div>
                                <div className="reference-name d-flex flex-column justify-content-center align-items-center">
                                    Others
                                    <input className="reference-radio-button" style={{"background" : "none"}}  type="radio" name="reference" value="others" {...register("reference")} />
                                </div>

                            </div>
                            {errors.reference && <span className='show-error '>{errors.reference.message}</span>}
                        </div>

                        <div className="col-md-6 gy-4 form-input-container">
                    
                            <div className="multiselect language form-input-field w-100 h-100" style={{border : langErr && "2px solid red"}}>
                                {/* Multiselect */}
                                 <MultipleSelectPlaceholder
                                    languageName={selectedLanguages}
                                    setLanguageName={setSelectedLanguages}
                                    onChange={handleLanguageChange}
                                    langErr = {langErr}
                                    setLangErr = {setLangErr}
                                     // Add onChange prop
                                />
                                {langErr && <span className='show-error'>Select at least one language</span>}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-12 form-input-container-textarea">
                    <div className="row h-100">
                        <div className="col-12">
                            {/* <input type="text" class = "special_remarks form-input-field w-100 h-100" placeholder = "Special remarks"> */}                            
                            <textarea className="form-input-field w-100 h-100 special-remarks"   style = {{border: errors.specialRemarks ? "2px solid red" : "none"}}
                                name="specialRemarks"
                                rows={isExpanded ? 4 : 1}
                                onClick={expand}
                                placeholder="Special remarks" 
                                maxLength="500" 
                                onChange={handleTextareaChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12 g-0 text-end px-3">
                    {/* {errors.specialRemarks && <span className='show-error '>{errors.specialRemarks.message}</span>} */}
                    
                    {errors.specialRemarks && (
        <span className="show-error">{errors.specialRemarks.message}</span>
      )}
                    <span className="remarks-count text-end">{specialCount}/500</span>
                </div>

                <div className="col-12 form-input-container">
                    <div className="row h-100">
                        <div className="col-12">
                            {/* <input class = "submit form-input-field w-100 h-100" type="submit" value ="Submit"> */}
                            <input className="submit form-input-field w-100 h-100" type="submit" value="Submit" onClick= {()=>
                               { check() }
                            }/>
                        </div>
                        </div></div></div>
                       
                      
                       {confirm && <ConfirmationPopup setEdit={setConfirm} details = {updateddata} otp = {setOtp} setUsers = {setUserStatusState} setUserStatusErr = {setExistsError} setAllPopupState = {setAllPopupState} allPopupState = {allPopupState}/>}
                      

                       {userStatusState && <UserStatusPopup setUsers = {setUserStatusState} message = {existsError} setUserStatusErr = {setExistsError} setAllPopupState = {setAllPopupState} allPopupState = {allPopupState}/>}

                       
                       {otppopup && <OtpPopup setEdit = {setConfirm} toggleResend = {setResend} resendState = {resendEnabled} otpstatus = {invalidOtp} setInvalidOtp = {setInvalidOtp} otp = {setOtp} details = {updateddata} setSuccessToggle = {setSuccess}  setSuccessPageData = {setSuccessData} setAllPopupState = {setAllPopupState} allPopupState = {allPopupState}/>}
                    
                       {success && <SuccessCard setConfirmPopup={setConfirm}  data = {successData} setAllPopupState = {setAllPopupState} allPopupState = {allPopupState} sendEmail = {sendEmail}/>}
       

                       { confirmAge && <AgeConfirmationPopup setconfirmAge = {setconfirmAge} setAllPopupState = {setAllPopupState} allPopupState = {allPopupState}/> }
                       
                       {invalidAge && <InvalidAgePopup setInvalidAge = {setInvalidAge} setAllPopupState = {setAllPopupState} allPopupState = {allPopupState}/> }

                        </form>


    )
    }

    export default RegistrationForm