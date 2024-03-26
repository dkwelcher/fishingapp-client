/* 
DateSearch.jsx is an intermediate component that displays a DatePicker input field & button.

@since 2024-03-19
*/

import { useState } from "react";
import DatePicker from "react-datepicker";
import { HiOutlineCalendar } from "react-icons/hi";

/* 
DateSearch renders a DatePicker from react-datepicker library & a button that processes the input from the DatePicker

@param setOpenSelectDateModal Setter function that sets the openSelectDateModal state to true or false.
@param getTripDate Function that retrieves a date.
@param setTripDate Setter function that sets the tripDate state with a data object formatted YYYY-MM-DD.
@param setTrip Setter function that sets the trip state.
@return HTML that renders a container with the DatePicker & button elements.
*/
function DateSearch({
  setOpenSelectDateModal,
  getTripDate,
  setTripDate,
  setTrip,
}) {
  // state that holds a Date object & is changed by the user.
  const [startDate, setStartDate] = useState(new Date());

  /* 
  handleSearchClick formats the startDate Date object properties into a String & calls the getTripDate with the formatted String.
  */
  const handleSearchClick = () => {
    if (startDate === null || startDate === undefined || startDate === "") {
      return;
    }
    const year = startDate.getFullYear();
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const day = startDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    getTripDate(formattedDate);
  };

  /* 
  handleLastSixMonthsClicks sets the tripDate & trip to undefined
  */
  function handleLastSixMonthsClick() {
    setTripDate();
    setTrip({});
  }

  /* Tailwind Class Styles */
  const dateSearchContainerStyles = "flex items-center";
  const datePickerContainerStyles = "";
  const datePickerStyles =
    "w-[200px] ml-1 border border-slate-400 rounded-sm bg-slate-50 text-slate-800 focus:bg-slate-200 focus:text-slate-900 outline-none shadow-md shadow-slate-950";
  const buttonContainerStyles = "flex flex-col gap-y-2 sm:flex-row";
  const buttonStyles =
    "ml-4 px-4 py-1 bg-slate-50 text-slate-800 rounded-sm shadow-md shadow-slate-950 text-sm sm:text-base";
  /* End Tailwind Class Styles */

  return (
    <div className={dateSearchContainerStyles}>
      <div className={datePickerContainerStyles}>
        <DatePicker
          className={datePickerStyles}
          showIcon
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          icon={<HiOutlineCalendar fontSize={20} className="text-gray-400" />}
        />
      </div>
      <div className={buttonContainerStyles}>
        <button
          className={buttonStyles}
          onClick={() => {
            setOpenSelectDateModal(true);
            handleSearchClick();
          }}
        >
          Select Date
        </button>
        <button
          className={buttonStyles}
          onClick={() => handleLastSixMonthsClick()}
        >
          Last Six Months
        </button>
      </div>
    </div>
  );
}

export default DateSearch;
