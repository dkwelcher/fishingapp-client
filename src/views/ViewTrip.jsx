import TripSearch from "../components/TripSearch";
import { useState } from "react";

function ViewTrip() {
  const [tripInfo, setTripInfo] = useState({ date: "", time: "" });

  const getTripInfo = (tripInfo) => {
    setTripInfo(tripInfo);
  };

  return (
    <div>
      <h2>Select date of trip</h2>
      <TripSearch getTripInfo={getTripInfo} />
      <p>{tripInfo.date}</p>
      <p>{tripInfo.time}</p>
    </div>
  );
}

export default ViewTrip;
