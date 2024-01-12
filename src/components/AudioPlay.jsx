/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlay.css'

const AudioPlay = (props) => {

    console.log(props.language);
    const [selectedLanguage, setSelectedLanguage] = useState(props.language);
    const [ audios, setAudios] = useState({
        English: "https://dl.sndup.net/kr6x/TSL_ENGLISH.mp4",
        Malayalam: "https://dl.sndup.net/cr76/TSL_Malayalam.mp4",
        Hindi: "https://dl.sndup.net/rrqr/TSL_Hindi.mp4",
        Kannada: "https://dl.sndup.net/jrr7/TSL_Kannada.mp4",
        Tamil: "https://dl.sndup.net/vtdn/TSL_Tamil.mp4",
        Telugu: "https://dl.sndup.net/cxfj/TSL_Telugu.mp4"
    });

  return (
    
    <div className="audio-section">
        <div className="row g-0 w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="col-9 col-md-10 h-100">
                <AudioPlayer
                    autoPlay
                    layout = "horizontal-reverse"
                    showJumpControls = {false} 
                    showFilledVolume = {false} 
                    showFilledProgress = {false} src={audios[`${selectedLanguage}`]}
                    volume={1} 
                    // Try other props!
                />
            </div>
            <div className="col-3 col-md-2 h-100 d-flex justify-content-center align-items-center">
                <select className="reg-language-select-button text-start h-50" 
                  value={selectedLanguage} 
                  onChange={(e) =>{ const val = e.target.value;
                        setSelectedLanguage(val);
                    }}
                >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default AudioPlay;