import { useState } from "react";
import InfoSection from "../components/views/InfoSection";
import TripCard from "../components/views/TripCard";
import SelectDateModal from "../components/modals/SelectDateModal";
import AddCatchModal from "../components/modals/AddCatchModal";
import EditCatchModal from "../components/modals/EditCatchModal";
import DeleteCatchModal from "../components/modals/DeleteCatchModal";
import EditTripModal from "../components/modals/EditTripModal";
import DeleteTripModal from "../components/modals/DeleteTripModal";
import Logo from "../assets/logo.png";

function ManageTrips() {
  const [user, setUser] = useState({
    id: "1",
    username: "user",
  });

  const [openSelectDateModal, setOpenSelectDateModal] = useState(false);
  const [openAddCatchModal, setOpenAddCatchModal] = useState(false);
  const [openEditCatchModal, setOpenEditCatchModal] = useState(false);
  const [openDeleteCatchModal, setOpenDeleteCatchModal] = useState(false);
  const [openEditTripModal, setOpenEditTripModal] = useState(false);
  const [openDeleteTripModal, setOpenDeleteTripModal] = useState(false);

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
      date: "2024-01-24",
    },
    {
      id: "2",
      location: "Lake Murray",
      date: "2024-02-01",
    },
  ]);

  const [trip, setTrip] = useState({
    id: "1",
    location: "Clarks Hill",
    date: "2024-01-24",
  });

  const [catches, setCatches] = useState([
    {
      id: "1",
      fish: "Striped Bass",
      time: "05:30",
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
      time: "05:36",
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
      time: "05:42",
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
      time: "05:44",
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
      time: "06:45",
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
      time: "06:47",
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
      time: "08:26",
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
      time: "08:28",
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
      time: "08:29",
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
      time: "08:42",
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
      time: "08:53",
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
      time: "08:59",
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
      <SelectDateModal
        openSelectDateModal={openSelectDateModal}
        setOpenSelectDateModal={setOpenSelectDateModal}
        trips={trips}
        setTrips={setTrips}
        trip={trip}
        setTrip={setTrip}
        tripInfo={tripInfo}
        setTripInfo={setTripInfo}
        getTripInfo={getTripInfo}
      />
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
      <DeleteTripModal
        openDeleteTripModal={openDeleteTripModal}
        setOpenDeleteTripModal={setOpenDeleteTripModal}
        trip={trip}
        setTrip={setTrip}
      />
      <div className="flex flex-col justify-center items-left text-slate-800">
        <InfoSection
          setOpenSelectDateModal={setOpenSelectDateModal}
          getTripInfo={getTripInfo}
          backgroundImage="bg-managetrips-image"
          title="Manage Your Fishing Trips"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora
            doloremque dolore nam, laborum maiores cupiditate inventore natus
            provident odit ipsum est, necessitatibus deleniti amet."
        />
        {trip && trip.id && trip.location && trip.date ? (
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
            openDeleteTripModal={openDeleteTripModal}
            setOpenDeleteTripModal={setOpenDeleteTripModal}
          />
        ) : (
          <div className="mt-8 w-full flex flex-col justify-center items-center m-auto font-paragraph">
            <div className="mb-10 flex justify-center items-center font-cursive font-bold text-slate-900">
              <img
                className="size-16"
                src={Logo}
                alt="Man fishing in a row boat"
              />
              <h2 className="text-7xl">Fishing App</h2>
            </div>
            <div className="w-full flex justify-around gap-8 px-12">
              <div className="flex flex-col gap-4">
                <h2 className="pb-2 font-title font-semibold text-2xl">
                  Lorem ipsum dolor sit amet.
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
                  assumenda explicabo! Nobis incidunt repellat similique
                  consequuntur quisquam inventore alias dolorum?
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum
                  minima suscipit autem quas quo recusandae atque reiciendis
                  quis velit officiis.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="pb-2 font-title font-semibold text-2xl">
                  Lorem ipsum dolor sit amet.
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  libero ullam accusantium maxime et nam maiores saepe, in modi
                  doloremque.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  nesciunt animi commodi neque iure autem libero officia
                  incidunt eum dolore.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="pb-2 font-title font-semibold text-2xl">
                  Lorem ipsum dolor sit amet.
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Repudiandae autem placeat vero ad tempore. Ea iusto quidem
                  accusantium harum tempore!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam at facilis aperiam iure molestiae vitae fugit
                  reiciendis dignissimos consequatur nihil.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageTrips;
