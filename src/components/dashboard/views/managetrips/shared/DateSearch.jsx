import { useState } from "react";
import DatePicker from "react-datepicker";
import { HiOutlineCalendar } from "react-icons/hi";

function DateSearch({ setOpenSelectDateModal, setTripDate, setTrip }) {
  // const [tripStartDate, setTripStartDate] = useState(new Date());

  const handleDateSelect = (date) => {
    if (date === null || date === undefined || date === "") {
      return;
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setTripDate(formattedDate);
  };

  function handleLastSixMonthsClick() {
    setTripDate();
    setTrip({});
  }

  return (
    <>
      <DatePicker
        className="w-[200px] ml-1 border border-slate-400 rounded-sm bg-slate-50 text-slate-800 focus:bg-slate-200 focus:text-slate-900 outline-none shadow-md shadow-slate-950"
        showIcon
        selected={new Date()}
        onChange={(date) => {
          handleDateSelect(date);
          setOpenSelectDateModal(true);
        }}
        icon={<HiOutlineCalendar fontSize={20} className="text-gray-400" />}
      />
      <button
        className="ml-4 px-4 py-1 bg-slate-50 text-slate-800 rounded-sm shadow-md shadow-slate-950 text-sm sm:text-base"
        onClick={() => handleLastSixMonthsClick()}
      >
        Show Last Six Months
      </button>
    </>
  );
}

export default DateSearch;
