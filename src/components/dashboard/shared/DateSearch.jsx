import { useState } from "react";
import DatePicker from "react-datepicker";
import { HiOutlineCalendar } from "react-icons/hi";

function DateSearch({ setOpenSelectDateModal, getTripDate }) {
  const [startDate, setStartDate] = useState(new Date());

  const handleSearchClick = () => {
    const year = startDate.getFullYear();
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const day = startDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    getTripDate(formattedDate);
  };

  /* Tailwind Class Styles */
  const dateSearchContainerStyles = "flex items-center";
  const datePickerContainerStyles = "";
  const datePickerStyles =
    "w-[200px] ml-1 border border-slate-400 rounded-sm bg-slate-50 text-slate-800 focus:bg-slate-200 focus:text-slate-900 outline-none";
  const buttonStyles = "ml-4 px-4 py-1 bg-slate-50 text-slate-800 rounded-sm";
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
      <div>
        <button
          className={buttonStyles}
          onClick={() => {
            setOpenSelectDateModal(true);
            handleSearchClick();
          }}
        >
          Select Date
        </button>
      </div>
    </div>
  );
}

export default DateSearch;
