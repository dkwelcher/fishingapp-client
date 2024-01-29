import { useState } from "react";
import InfoSection from "../components/views/InfoSection";
import TripCard from "../components/views/TripCard";

function EditTrip() {
  const [tripInfo, setTripInfo] = useState({ date: "", time: "" });

  const getTripInfo = (tripInfo) => {
    setTripInfo(tripInfo);
  };

  const [trip] = useState({});

  const [catches] = useState([]);

  return (
    <div className="flex flex-col justify-center items-left text-slate-800">
      <InfoSection
        getTripInfo={getTripInfo}
        backgroundImage="bg-edittrip-image"
        title="Manage Your Fishing Trips"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora
      doloremque dolore nam, laborum maiores cupiditate inventore natus
      provident odit ipsum est, necessitatibus deleniti amet."
      />

      <TripCard trip={trip} catches={catches} />
    </div>
  );
}

export default EditTrip;
