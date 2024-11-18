import { useState } from "react";
import DatePicker from "react-datepicker";
import { HiOutlineCalendar } from "react-icons/hi";

function DateSearch({ setOpenSelectDateModal, setTripDate, setTrip }) {
  const [tripStartDate, setTripStartDate] = useState(new Date());

  const handleSearchClick = () => {
    if (
      tripStartDate === null ||
      tripStartDate === undefined ||
      tripStartDate === ""
    ) {
      return;
    }
    const year = tripStartDate.getFullYear();
    const month = (tripStartDate.getMonth() + 1).toString().padStart(2, "0");
    const day = tripStartDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setTripDate(formattedDate);
  };

  function handleLastSixMonthsClick() {
    setTripDate();
    setTrip({});
  }

  /* Tailwind Class Styles */
  const buttonStyles =
    "ml-4 px-4 py-1 bg-slate-50 text-slate-800 rounded-sm shadow-md shadow-slate-950 text-sm sm:text-base";
  /* End Tailwind Class Styles */

  return (
    <>
      <DatePicker
        className="w-[200px] ml-1 border border-slate-400 rounded-sm bg-slate-50 text-slate-800 focus:bg-slate-200 focus:text-slate-900 outline-none shadow-md shadow-slate-950"
        showIcon
        selected={tripStartDate}
        onChange={(date) => setTripStartDate(date)}
        icon={<HiOutlineCalendar fontSize={20} className="text-gray-400" />}
      />
      <div className="flex flex-col gap-y-2 sm:flex-row">
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
    </>
  );
}

export default DateSearch;
