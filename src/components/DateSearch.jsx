import { useState } from "react";
import DatePicker from "react-datepicker";
import { HiOutlineCalendar } from "react-icons/hi";

function DateSearch({ getTripInfo }) {
  const [startDate, setStartDate] = useState(new Date());

  const formatSearchClick = () => {
    const year = startDate.getFullYear();
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const day = startDate.getDate().toString().padStart(2, "0");

    const hours = startDate.getHours().toString().padStart(2, "0");
    const minutes = startDate.getMinutes().toString().padStart(2, "0");
    // const seconds = startDate.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}`;

    getTripInfo({ date: formattedDate, time: formattedTime });
  };

  return (
    <div className="relative">
      <DatePicker
        className="ml-1 border border-gray-300 rounded-sm text-slate-600"
        showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        icon={<HiOutlineCalendar fontSize={20} className="text-gray-400" />}
      />
    </div>
  );
}

export default DateSearch;
