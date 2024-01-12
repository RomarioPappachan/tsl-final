import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function ResponsiveDatePickers({ setDob, setTog ,dob ,setconfirmAge, setInvalidAge }) {
  // Function to check if a date is in the future
  const isFutureDate = (date) => dayjs().isBefore(date);

  // Function to disable dates outside the range 1930-01-01 to current year - 5 years
  const shouldDisableDate = (date) => {
    const minDate = dayjs('1930-01-01');
    const maxDate = dayjs().subtract(5, 'year');
    return isFutureDate(date) || date.isBefore(minDate) || date.isAfter(maxDate);
  };

  // Set default date to current year - 5 years
  const defaultDate = dayjs().subtract(5, 'year');

  

  return (
    <LocalizationProvider 
      dateAdapter={AdapterDayjs} 
      sx={{ m: 0, width: "100%", mt: 0, border: 0, height: "3rem", boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.5) !important"}}
    >
      <DesktopDatePicker
        label="DOB"
        // eslint-disable-next-line no-unused-vars
        onChange={(newDate) => { setTog(false); setDob(newDate); const currentDate = dayjs(); console.log(newDate);
          if (newDate && newDate.isValid() && !shouldDisableDate(newDate)) {
            // Check if the date is valid and within the allowed range
            if (currentDate.diff(newDate, 'year') < 18) {
              setconfirmAge(true);
              setInvalidAge(false);
            } else {
              setconfirmAge(false);
              setInvalidAge(false);
            }
          } else if (newDate && newDate.isValid() && shouldDisableDate(newDate)) {
            if (currentDate.diff(newDate, 'year') < 5 ) {
              setconfirmAge(false);
              setInvalidAge(true);
              setDob(false);
              setTog(true);
            } else {
              setconfirmAge(false);
              setDob(false);
              setTog(true);
            }
          } else {
            // If the entered date is not valid or outside the range, reset the confirmAge state to false.
            setconfirmAge(false);
            setDob(false);
            setTog(true);
          }
        }}
        shouldDisableDate={ shouldDisableDate}
        format="DD/MM/YYYY"
        minDate = { dayjs('1930-01-01') }
        maxDate={ dayjs().subtract(5, 'year') }  // Set max date to current year - 5 years
        defaultDate={defaultDate}  // Set default date to current year - 5 years
        sx={{ bgcolor: "#fff", borderRadius: "5px", m: 0, border: "0", height: "3.2rem", '& .MuiInputLabel-root': {
            color: '#000',      // Set placeholder text color to black
            fontWeight: 400,   // Set placeholder text font weight to 500
          },}}
      />
    </LocalizationProvider>
  );
}
