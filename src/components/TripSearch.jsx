import { useState } from "react";
import DatePicker from "react-datepicker";

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
    <div>
      <DatePicker
        className="p-1"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
      />
      <button onClick={formatSearchClick}>Search</button>
    </div>
  );
}

export default TripSearch;
