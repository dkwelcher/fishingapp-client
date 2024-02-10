import { useEffect, useState } from "react";
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
    id: 1302,
    username: "newUser",
  });

  const [openSelectDateModal, setOpenSelectDateModal] = useState(false);
  const [openAddCatchModal, setOpenAddCatchModal] = useState(false);
  const [openEditCatchModal, setOpenEditCatchModal] = useState(false);
  const [openDeleteCatchModal, setOpenDeleteCatchModal] = useState(false);
  const [openEditTripModal, setOpenEditTripModal] = useState(false);
  const [openDeleteTripModal, setOpenDeleteTripModal] = useState(false);

  const [tempCatch, setTempCatch] = useState({});
  const [tempTrip, setTempTrip] = useState({});

  const [tripInfo, setTripInfo] = useState();

  function getTripInfo(tripInfoItem) {
    setTripInfo(tripInfoItem);
    //setTripInfo("2024-02-02");
  }

  const [trips, setTrips] = useState([]);

  const [trip, setTrip] = useState({});

  const [catches, setCatches] = useState([]);

  const GET_TRIPS_BY_ID = `http://localhost:8080/trips&date?id=${user.id}&date=${tripInfo}`;
  const [fetchTripsError, setFetchTripsError] = useState();

  useEffect(() => {
    const fetchTrips = async () => {
      if (!tripInfo) return;

      try {
        const response = await fetch(GET_TRIPS_BY_ID);
        const tripObjects = await response.json();
        setTrips(tripObjects);
      } catch (error) {
        setFetchTripsError(error);
        console.log(fetchTripsError);
      }
    };

    fetchTrips();
  }, [tripInfo, user.id]);

  const GET_CATCHES_BY_TRIP_ID = `http://localhost:8080/catches?tripId=${trip.id}`;
  const [fetchCatchesError, setFetchCatchesError] = useState();

  useEffect(() => {
    const fetchCatches = async () => {
      if (!trip || !trip.id) return;

      try {
        const response = await fetch(GET_CATCHES_BY_TRIP_ID);
        const catchObjectArray = await response.json();

        const convertedCatches = catchObjectArray.map((catchObject) => ({
          id: catchObject.catchId,
          time: catchObject.time.slice(0, 5),
          latitude: catchObject.latitude,
          longitude: catchObject.longitude,
          fish: catchObject.species,
          bait: catchObject.lureOrBait,
          weather: catchObject.weatherCondition,
          airTemp: catchObject.airTemperature,
          waterTemp: catchObject.waterTemperature,
          windSpeed: catchObject.windSpeed,
        }));

        setCatches(convertedCatches);
      } catch (error) {
        setFetchCatchesError(error);
        console.log(fetchCatchesError);
      }
    };

    fetchCatches();
  }, [trip]);

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
