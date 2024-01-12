import { useState } from 'react';

import SlidingContainer from '../components/SlidingContainer';



const UserRegistration = () => {


  const [language, setLanguage] = useState(["English"]);
  const [isClicked, setIsClicked] = useState(false);


  function proceedClicked() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <div className="hero-main-container container-fluid m-0 p-0">
      
        <select className="home-language-select-button p-0" 
          onChange={(e) =>{ 
             const lang= e.target.value;
             setLanguage(lang);
            }} 
          name="language"
          value={language} 
          id='language' 
          style={{ backgroundColor: "#081e59", fontSize: "1.5rem", textAlignLast: "center" }} 
        >Select a Language
          <option value="" disabled>Select a language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Kannada">Kannada</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
        </select>

        <button className="proceed-button" onClick={proceedClicked}>Proceed</button>

        {isClicked && <SlidingContainer language={language} isClicked={isClicked} /> }
        
        
  


      </div>

    </>
  )
}

export default UserRegistration;
