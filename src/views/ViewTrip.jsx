import TripSearch from "../components/TripSearch";
import { useState } from "react";

function ViewTrip() {
  const [tripInfo, setTripInfo] = useState({ date: "", time: "" });

  const getTripInfo = (tripInfo) => {
    setTripInfo(tripInfo);
  };

  return (
    <div className="flex flex-col justify-center items-left px-[20%] py-8">
      <div className="flex flex-col justify-center items-left">
        <h1>Find Your Recorded Fishing Trips</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora
          doloremque dolore nam, laborum maiores cupiditate inventore natus
          provident odit ipsum est, necessitatibus deleniti amet.
        </p>
      </div>
      <div>
        <TripSearch getTripInfo={getTripInfo} />
      </div>
    </div>
  );
}

export default ViewTrip;
