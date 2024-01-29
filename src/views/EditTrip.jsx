import DateSearch from "../components/DateSearch";
import { useState } from "react";
import ViewCard from "../components/ViewCard";

function EditTrip() {
  const [tripInfo, setTripInfo] = useState({ date: "", time: "" });

  const getTripInfo = (tripInfo) => {
    setTripInfo(tripInfo);
  };

  const [trip] = useState({});

  const [catches] = useState([]);

  return (
    <div className="flex flex-col justify-center items-left text-slate-800">
      <div className="flex flex-col justify-center items-left px-10 py-20 mb-8 bg-edittrip-image bg-cover bg-center text-white">
        <h1 className="font-title font-medium text-4xl mb-4">
          Manage Your Fishing Trips
        </h1>
        <p className="w-[40%] font-paragraph text-md mb-8">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora
          doloremque dolore nam, laborum maiores cupiditate inventore natus
          provident odit ipsum est, necessitatibus deleniti amet.
        </p>
        <div>
          <DateSearch getTripInfo={getTripInfo} />
        </div>
      </div>

      <div
        className={`w-[95%] mx-auto mb-4 p-4 rounded-md ${
          trip && catches.length > 0
            ? "bg-gradient-to-b from-slate-800 to-slate-400"
            : ""
        }`}
      >
        <div
          className={`w-[500px] h-[500px] bg-green-200 m-auto ${
            trip && catches.length > 0 ? "hidden" : ""
          }`}
        ></div>
        <div className="flex justify-between mb-4 text-white">
          {trip.location && (
            <h2 className="font-title text-2xl">{trip.location}</h2>
          )}
          {trip.date && <h2 className="font-title text-2xl">{trip.date}</h2>}
        </div>
        <div className="px-4">
          {catches && catches.length > 0 && <ViewCard catches={catches} />}
        </div>
      </div>
    </div>
  );
}

export default EditTrip;
