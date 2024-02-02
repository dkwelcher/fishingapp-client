import { useState } from "react";
import InfoSection from "../components/views/InfoSection";
import TripCard from "../components/views/TripCard";
import AddCatchModal from "../components/modals/AddCatchModal";
import EditCatchModal from "../components/modals/EditCatchModal";
import DeleteCatchModal from "../components/modals/DeleteCatchModal";
import EditTripModal from "../components/modals/EditTripModal";

function ManageTrips() {
  const [openAddCatchModal, setOpenAddCatchModal] = useState(false);
  const [openEditCatchModal, setOpenEditCatchModal] = useState(false);
  const [openDeleteCatchModal, setOpenDeleteCatchModal] = useState(false);
  const [openEditTripModal, setOpenEditTripModal] = useState(false);

  const [tempCatch, setTempCatch] = useState({});
  const [tempTrip, setTempTrip] = useState({});

  const [tripInfo, setTripInfo] = useState({ date: "", time: "" });

  const getTripInfo = (tripInfo) => {
    // query the database
    // update the useState for trip

    setTripInfo(tripInfo);
  };

  const [trips, setTrips] = useState([
    {
      id: "1",
      location: "Clarks Hill",
      date: "01/23/2024",
    },
    {
      id: "2",
      location: "Lake Murray",
      date: "02/2/2024",
    },
  ]);

  const [trip, setTrip] = useState({
    id: "1",
    location: "Clarks Hill",
    date: "01/23/2024",
  });

  const [catches, setCatches] = useState([
    {
      id: "1",
      fish: "Striped Bass",
      time: "5:30 am",
      latitude: "33.691743",
      longitude: "-82.217761",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "65",
      waterTemp: "60",
      windSpeed: "8",
    },
    {
      id: "2",
      fish: "Striped Bass",
      time: "5:36 am",
      latitude: "32.259143",
      longitude: "-81.198345",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "65",
      waterTemp: "60",
      windSpeed: "8",
    },
    {
      id: "3",
      fish: "Striped Bass",
      time: "5:42 am",
      latitude: "33.613486",
      longitude: "-82.991645",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "65",
      waterTemp: "60",
      windSpeed: "8",
    },
    {
      id: "4",
      fish: "Channel Catfish",
      time: "5:44 am",
      latitude: "33.613589",
      longitude: "-82.992346",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "65",
      waterTemp: "60",
      windSpeed: "8",
    },
    {
      id: "5",
      fish: "Striped Bass",
      time: "6:45 am",
      latitude: "34.513486",
      longitude: "-83.543168",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "68",
      waterTemp: "60",
      windSpeed: "8",
    },
    {
      id: "7",
      fish: "Largemouth Bass",
      time: "6:47 am",
      latitude: "34.513246",
      longitude: "-83.549476",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "68",
      waterTemp: "60",
      windSpeed: "8",
    },
    {
      id: "8",
      fish: "Striped Bass",
      time: "8:26 am",
      latitude: "36.761389",
      longitude: "-86.498315",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "72",
      waterTemp: "61",
      windSpeed: "8",
    },
    {
      id: "9",
      fish: "Channel Catfish",
      time: "8:28 am",
      latitude: "36.761389",
      longitude: "-86.498315",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "72",
      waterTemp: "61",
      windSpeed: "8",
    },
    {
      id: "10",
      fish: "Striped Bass",
      time: "8:29 am",
      latitude: "35.984351",
      longitude: "-86.986479",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "72",
      waterTemp: "61",
      windSpeed: "8",
    },
    {
      id: "11",
      fish: "Striped Bass",
      time: "8:42 am",
      latitude: "36.846388",
      longitude: "-86.912549",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "74",
      waterTemp: "61",
      windSpeed: "8",
    },
    {
      id: "12",
      fish: "Striped Bass",
      time: "8:53 am",
      latitude: "36.761389",
      longitude: "-86.498315",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "74",
      waterTemp: "61",
      windSpeed: "8",
    },
    {
      id: "13",
      fish: "Striped Bass",
      time: "8:59 am",
      latitude: "36.761389",
      longitude: "-86.998315",
      bait: "Blueback Herring",
      weather: "cloudy",
      airTemp: "74",
      waterTemp: "61",
      windSpeed: "8",
    },
  ]);

  return (
    <div>
      <AddCatchModal
        openAddCatchModal={openAddCatchModal}
        setOpenAddCatchModal={setOpenAddCatchModal}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        catches={catches}
        setCatches={setCatches}
      />
      <EditCatchModal
        openEditCatchModal={openEditCatchModal}
        setOpenEditCatchModal={setOpenEditCatchModal}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        catches={catches}
        setCatches={setCatches}
      />
      <DeleteCatchModal
        openDeleteCatchModal={openDeleteCatchModal}
        setOpenDeleteCatchModal={setOpenDeleteCatchModal}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        catches={catches}
        setCatches={setCatches}
      />
      <EditTripModal
        openEditTripModal={openEditTripModal}
        setOpenEditTripModal={setOpenEditTripModal}
        trip={trip}
        setTrip={setTrip}
        tempTrip={tempTrip}
        setTempTrip={setTempTrip}
      />
      <div className="flex flex-col justify-center items-left text-slate-800">
        <InfoSection
          getTripInfo={getTripInfo}
          backgroundImage="bg-viewtrip-image"
          title="Manage Your Fishing Trips"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora
            doloremque dolore nam, laborum maiores cupiditate inventore natus
            provident odit ipsum est, necessitatibus deleniti amet."
        />
        <TripCard
          trip={trip}
          setTrip={setTrip}
          tempTrip={tempTrip}
          setTempTrip={setTempTrip}
          catches={catches}
          setCatches={setCatches}
          setTempCatch={setTempCatch}
          openAddCatchModal={openAddCatchModal}
          setOpenAddCatchModal={setOpenAddCatchModal}
          openEditCatchModal={openEditCatchModal}
          setOpenEditCatchModal={setOpenEditCatchModal}
          openDeleteCatchModal={openDeleteCatchModal}
          setOpenDeleteCatchModal={setOpenDeleteCatchModal}
          openEditTripModal={openEditTripModal}
          setOpenEditTripModal={setOpenEditTripModal}
        />
      </div>
    </div>
  );
}

export default ManageTrips;
