import { useEffect, useState } from "react";
import InfoSection from "../sections/InfoSection";
import TripCard from "../cards/TripCard";
import SelectDateModal from "../../modals/SelectDateModal";
import AddCatchModal from "../../modals/AddCatchModal";
import EditCatchModal from "../../modals/EditCatchModal";
import DeleteCatchModal from "../../modals/DeleteCatchModal";
import EditTripModal from "../../modals/EditTripModal";
import DeleteTripModal from "../../modals/DeleteTripModal";
import Logo from "../../../assets/logo.png";

function ManageTrips({ user }) {
  const [openSelectDateModal, setOpenSelectDateModal] = useState(false);
  const [openAddCatchModal, setOpenAddCatchModal] = useState(false);
  const [openEditCatchModal, setOpenEditCatchModal] = useState(false);
  const [openDeleteCatchModal, setOpenDeleteCatchModal] = useState(false);
  const [openEditTripModal, setOpenEditTripModal] = useState(false);
  const [openDeleteTripModal, setOpenDeleteTripModal] = useState(false);

  const [tempCatch, setTempCatch] = useState({});
  const [tempTrip, setTempTrip] = useState({});

  const [tripDate, setTripDate] = useState();

  function getTripDate(tripDate) {
    setTripDate(tripDate);
  }

  const [trips, setTrips] = useState([]);

  const [trip, setTrip] = useState({});

  const [catches, setCatches] = useState([]);

  const [fetchTripsError, setFetchTripsError] = useState();

  useEffect(() => {
    const fetchTrips = async () => {
      if (!tripDate || !user.id) return;

      const GET_TRIPS_BY_ID = `http://localhost:8080/trips&date?id=${user.id}&date=${tripDate}`;

      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(GET_TRIPS_BY_ID, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const tripObjects = await response.json();
        setTrips(tripObjects);
      } catch (error) {
        console.log(fetchTripsError);
        setFetchTripsError(error);
      }
    };

    fetchTrips();
  }, [tripDate, user.id, trips]);

  const [fetchCatchesError, setFetchCatchesError] = useState();

  useEffect(() => {
    const fetchCatches = async () => {
      if (!trip || !trip.id) return;

      const GET_CATCHES_BY_TRIP_ID = `http://localhost:8080/catches?tripId=${trip.id}`;
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(GET_CATCHES_BY_TRIP_ID, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
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
        sortCatches();
      } catch (error) {
        setFetchCatchesError(error);
        console.log(fetchCatchesError);
      }
    };

    fetchCatches();
  }, [trip]);

  function sortCatches() {
    setCatches((catches) => {
      return [...catches].sort((a, b) => {
        const [hoursA, minutesA] = a.time.split(":").map(Number);
        const [hoursB, minutesB] = b.time.split(":").map(Number);
        const totalMinutesA = hoursA * 60 + minutesA;
        const totalMinutesB = hoursB * 60 + minutesB;

        return totalMinutesA - totalMinutesB;
      });
    });
  }

  /* Tailwind Class Styles */
  const pageStyles = "flex flex-col justify-center items-left text-slate-800";
  const idleContainerStyles =
    "mt-8 w-full flex flex-col justify-center items-center m-auto font-paragraph";
  const idleLogoContainerStyles =
    "mb-10 flex justify-center items-center font-cursive font-bold text-slate-900";
  const idleLogoImageStyles = "size-16";
  const idleLogoNameStyles = "text-7xl";
  const idleContentContainerStyles = "w-full flex justify-around gap-8 px-12";
  const idleContentCardStyles = "flex flex-col gap-4";
  const idleContentCardTitleStyles = "pb-2 font-title font-semibold text-2xl";
  /* End Tailwind Class Styles */

  return (
    <div>
      <SelectDateModal
        openSelectDateModal={openSelectDateModal}
        setOpenSelectDateModal={setOpenSelectDateModal}
        trips={trips}
        setTrips={setTrips}
        trip={trip}
        setTrip={setTrip}
        tripDate={tripDate}
        setTripDate={setTripDate}
        getTripDate={getTripDate}
        user={user}
      />
      <AddCatchModal
        openAddCatchModal={openAddCatchModal}
        setOpenAddCatchModal={setOpenAddCatchModal}
        user={user}
        trip={trip}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        catches={catches}
        setCatches={setCatches}
      />
      <EditCatchModal
        openEditCatchModal={openEditCatchModal}
        setOpenEditCatchModal={setOpenEditCatchModal}
        user={user}
        trip={trip}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        catches={catches}
        setCatches={setCatches}
      />
      <DeleteCatchModal
        openDeleteCatchModal={openDeleteCatchModal}
        setOpenDeleteCatchModal={setOpenDeleteCatchModal}
        user={user}
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
        trips={trips}
        setTrips={setTrips}
        tempTrip={tempTrip}
        setTempTrip={setTempTrip}
        setTripDate={setTripDate}
        user={user}
      />
      <DeleteTripModal
        openDeleteTripModal={openDeleteTripModal}
        setOpenDeleteTripModal={setOpenDeleteTripModal}
        trip={trip}
        setTrip={setTrip}
        setTripDate={setTripDate}
      />
      <div className={pageStyles}>
        <InfoSection
          setOpenSelectDateModal={setOpenSelectDateModal}
          getTripDate={getTripDate}
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
          <div className={idleContainerStyles}>
            <div className={idleLogoContainerStyles}>
              <img
                className={idleLogoImageStyles}
                src={Logo}
                alt="Man fishing in a row boat"
              />
              <h2 className={idleLogoNameStyles}>Fishing App</h2>
            </div>
            <div className={idleContentContainerStyles}>
              <div className={idleContentCardStyles}>
                <h2 className={idleContentCardTitleStyles}>
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
              <div className={idleContentCardStyles}>
                <h2 className={idleContentCardTitleStyles}>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageTrips;
