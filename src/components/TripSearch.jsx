import { useState } from "react";
import DatePicker from "react-datepicker";
import { HiOutlineCalendar } from "react-icons/hi";

function TripSearch({ getTripInfo }) {
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
      <HiOutlineCalendar
        fontSize={20}
        className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-1 z-10"
      />
      <DatePicker
        className="pl-8 py-1 border border-gray-300 rounded-sm text-slate-600"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
      />
      {/* <button onClick={formatSearchClick}>Search</button> */}
    </div>
  );
}

export default TripSearch;
