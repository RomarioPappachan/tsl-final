// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import "./MultipleSelectPlaceholder.css"

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const languages = ['English', 'Hindi', 'Kannada', 'Malayalam', 'Tamil', 'Telugu'];

// function getStyles(language, selectedLanguages, theme) {
//   return {
//     fontWeight:
//       selectedLanguages.indexOf(language) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// const MultipleSelectPlaceholder = ({ languageName, setLanguageName, langErr, setLangErr }) => {
//   const theme = useTheme();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleCloseClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleChange = (event) => {
//     if (selectedLanguages.length < 1) {
//       setLangErr(true);
//     } else {
//       setLangErr(false);
//     }

//     const {
//       target: { value },
//     } = event;

//     if (value.length < 1) {
//       setLangErr(true);
//     } else {
//       setLangErr(false);
//     }
//     console.log(value)
//     if(!value.includes('close')){
      
//     setLanguageName(typeof value === 'string' ? value.split(',') : value);
  
//   }
//   };

//   const selectedLanguages = languageName || [];

//   return (
//     <div>
//       <FormControl sx={{ m: 0, pb: 0, width: "100%", border: 0, textAlign: "left" }}>
//         <Select
//           multiple
//           displayEmpty
//           value={selectedLanguages}
//           onChange={handleChange}
//           input={<OutlinedInput />}
//           renderValue={(selected) => {
//             console.log(selected.includes("Click here to Close"),'close')
//             if (selected.length === 0 || selected.includes("Click here to Close")) {
//               return <span>Select Languages</span>;
//             }

//             return selected.join(', ');
//           }}
//           MenuProps={MenuProps}
//           inputProps={{ 'aria-label': 'Without label' }}
//           sx={{ pb: 0, m: 0, height: "3.1rem" }}
//           open={isOpen}
//           onClose={() => setIsOpen(false)}
//           onOpen={() => setIsOpen(true)}
//         >
          
//           {languages.map((language) => (
//             <MenuItem
//               key={language}
//               value={language}
//               style={getStyles(language, selectedLanguages, theme)}
//             >
//               {language}
//             </MenuItem>
//           ))}

//           <MenuItem onClick={handleCloseClick} value="close" >
//             <span>Confirm Selection</span>
//           </MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   );  
// };

// MultipleSelectPlaceholder.propTypes = {
//   setLanguageName: PropTypes.func.isRequired,
//   languageName: PropTypes.arrayOf(PropTypes.string).isRequired,
//   langErr: PropTypes.bool.isRequired,
//   setLangErr: PropTypes.func.isRequired,
// };

// export default MultipleSelectPlaceholder;















/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const languages = ['English', 'Hindi', 'Kannada', 'Malayalam', 'Tamil', 'Telugu'];

function getStyles(language, selectedLanguages, theme) {
  return {
    fontWeight:
      selectedLanguages.indexOf(language) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectPlaceholder = ({ languageName, setLanguageName, langErr, setLangErr }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event) => {
    if (selectedLanguages.length < 1) {
      setLangErr(true);
    } else {
      setLangErr(false);
    }

    const {
      target: { value },
    } = event;

    if (value.length < 1) {
      setLangErr(true);
    } else {
      setLangErr(false);
    }
    console.log(value);
    if (!value.includes('close')) {
      setLanguageName(typeof value === 'string' ? value.split(',') : value);
    }
  };

  const selectedLanguages = languageName || [];

  return (
    <div>
      <FormControl sx={{ m: 0, pb: 0, width: "100%", border: 0, textAlign: "left" }}>
        <Select
          multiple
          displayEmpty
          value={selectedLanguages}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            console.log(selected.includes("Click here to Close"), 'close');
            if (selected.length === 0 || selected.includes("Click here to Close")) {
              return <span>Languages known</span>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ pb: 0, m: 0, height: "3.1rem" }}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
        >
          
          {languages.map((language) => (
            <MenuItem
              key={language}
              value={language}
              style={getStyles(language, selectedLanguages, theme)}
            >
              <Checkbox checked={selectedLanguages.indexOf(language) > -1} />
              {language}
            </MenuItem>
          ))}

          <MenuItem onClick={handleCloseClick} value="close" sx={{paddingLeft: "27px", fontWeight: "600", textAlign : "center", margin: "auto" }}>
            <button className='m-auto border-0 rounded-3' style={{ height: "2.5rem", width: "100%",  backgroundColor: "#dfe6e9", fontWeight: "600"}}>Confirm</button>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

MultipleSelectPlaceholder.propTypes = {
  setLanguageName: PropTypes.func.isRequired,
  languageName: PropTypes.arrayOf(PropTypes.string).isRequired,
  langErr: PropTypes.bool.isRequired,
  setLangErr: PropTypes.func.isRequired,
};

export default MultipleSelectPlaceholder;