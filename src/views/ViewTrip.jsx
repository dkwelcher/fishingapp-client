import TripSearch from "../components/TripSearch";
import { useState } from "react";
import ViewCard from "../components/ViewCard";

function ViewTrip() {
  const [tripInfo, setTripInfo] = useState({ date: "", time: "" });

  const getTripInfo = (tripInfo) => {
    setTripInfo(tripInfo);
  };

  const [trip] = useState({
    location: "Clarks Hill",
    date: "1/16/2024",
  });

  const [catches] = useState([
    {
      fish: "Striped Bass",
      time: "6:30",
      latitude: "30.0",
      longitude: "-90.0",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "65",
      waterTemp: "60",
      windSpeed: "8",
    },
    {
      fish: "Striped Bass",
      time: "6:30",
      latitude: "30.0",
      longitude: "-90.0",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "65",
      waterTemp: "60",
      windSpeed: "8",
    },
    {
      fish: "Striped Bass",
      time: "6:30",
      latitude: "30.0",
      longitude: "-90.0",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "65",
      waterTemp: "60",
      windSpeed: "8",
    },
    {
      fish: "Striped Bass",
      time: "6:30",
      latitude: "30.0",
      longitude: "-90.0",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "65",
      waterTemp: "60",
      windSpeed: "8",
    },
    {
      fish: "Striped Bass",
      time: "6:30",
      latitude: "30.0",
      longitude: "-90.0",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "65",
      waterTemp: "60",
      windSpeed: "8",
    },
  ]);

  return (
    <div className="flex flex-col justify-center items-left px-[20%] py-8">
      <div className="flex flex-col justify-center items-left mb-4">
        <h1 className="font-title font-medium text-3xl mb-4">
          Find Your Recorded Fishing Trips
        </h1>
        <p className="w-[60%] font-paragraph text-md">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora
          doloremque dolore nam, laborum maiores cupiditate inventore natus
          provident odit ipsum est, necessitatibus deleniti amet.
        </p>
      </div>
      <div className="mb-8">
        <TripSearch getTripInfo={getTripInfo} />
      </div>
      <div className="bg-gradient-to-b from-slate-800 to-slate-400 p-2 rounded-md">
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

export default ViewTrip;
