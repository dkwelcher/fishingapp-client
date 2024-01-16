import TripSearch from "../components/TripSearch";
import { useState } from "react";
import ViewCard from "../components/ViewCard";

function ViewTrip() {
  const [tripInfo, setTripInfo] = useState({ date: "", time: "" });

  const getTripInfo = (tripInfo) => {
    setTripInfo(tripInfo);
  };

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
      <div className="flex justify-between">
        <h2>Clarks Hill</h2>
        <h2>1/16/2024</h2>
      </div>
      <div>
        {catches && catches.length > 0 && <ViewCard catches={catches} />}
      </div>
    </div>
  );
}

export default ViewTrip;
