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

function ManageTrips({ user, screenWidth }) {
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

  const [tripsLastSixMonths, setTripsLastSixMonths] = useState([]);

  const [trips, setTrips] = useState([]);

  const [trip, setTrip] = useState({});

  const [catches, setCatches] = useState([]);

  const [fetchTripsError, setFetchTripsError] = useState();

  useEffect(() => {
    const fetchTrips = async () => {
      if (!tripDate || !user.id) return;

      const GET_TRIPS_BY_ID = `http://localhost:8080/trips?userId=${user.id}&date=${tripDate}`;

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
  }, [tripDate, user.id]);

  const [fetchCatchesError, setFetchCatchesError] = useState();

  useEffect(() => {
    const fetchCatches = async () => {
      if (!trip || !trip.id) return;

      const GET_CATCHES_BY_TRIP_ID = `http://localhost:8080/catches?userId=${user.id}&tripId=${trip.id}`;
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

  useEffect(() => {
    const fetchTripsLastSixMonths = async () => {
      if (!user.id) return;

      const GET_TRIPS_BY_USER_ID = `http://localhost:8080/trips/sixMonths?userId=${user.id}`;
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(GET_TRIPS_BY_USER_ID, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const tripsObjects = await response.json();

        tripsObjects.sort((a, b) => new Date(b.date) - new Date(a.date));
        const groupedTrips = tripsObjects.reduce((acc, trip) => {
          const [year, month, day] = trip.date
            .split("-")
            .map((num) => parseInt(num, 10));
          const date = new Date(year, month - 1, day);
          const monthYear = date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });

          if (!acc[monthYear]) {
            acc[monthYear] = [];
          }

          const formattedDate = `${String(month).padStart(2, "0")}/${String(
            day
          ).padStart(2, "0")}`;
          acc[monthYear].push({ ...trip, formattedDate });

          return acc;
        }, {});

        setTripsLastSixMonths(groupedTrips);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTripsLastSixMonths();
  }, [trip]);

  function handleRecentTrip(dataKey) {
    const selectedTrip = getTripByTripId(dataKey);
    const updatedTripObject = {
      id: selectedTrip.tripId,
      location: selectedTrip.bodyOfWater,
      date: selectedTrip.date,
    };
    setTrip(updatedTripObject);
  }

  function getTripByTripId(dataKey) {
    for (let month in tripsLastSixMonths) {
      if (tripsLastSixMonths.hasOwnProperty(month)) {
        for (let trip of tripsLastSixMonths[month]) {
          if (Number(trip.tripId) === Number(dataKey)) {
            return trip;
          }
        }
      }
    }
  }

  /* Tailwind Class Styles */
  const pageStyles = "bg-slate-100 text-slate-800";
  const idleContainerStyles = "p-10 px-4";
  const idleLogoContainerStyles =
    "pb-10 flex flex-col justify-center items-center gap-x-2 font-cursive text-slate-900";
  const idleLogoImageStyles =
    "size-36 sm:size-44 md:size-52 lg:size-64 xl:size-80 2xl:size-96";
  const idleLogoNameStyles =
    "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[200px]";
  /* End Tailwind Class Styles */

  return (
    <div>
      <SelectDateModal
        openSelectDateModal={openSelectDateModal}
        setOpenSelectDateModal={setOpenSelectDateModal}
        trips={trips}
        setTrips={setTrips}
        setTrip={setTrip}
        tripDate={tripDate}
        user={user}
      />
      <AddCatchModal
        openAddCatchModal={openAddCatchModal}
        setOpenAddCatchModal={setOpenAddCatchModal}
        user={user}
        trip={trip}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        setCatches={setCatches}
      />
      <EditCatchModal
        openEditCatchModal={openEditCatchModal}
        setOpenEditCatchModal={setOpenEditCatchModal}
        user={user}
        trip={trip}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        setCatches={setCatches}
      />
      <DeleteCatchModal
        openDeleteCatchModal={openDeleteCatchModal}
        setOpenDeleteCatchModal={setOpenDeleteCatchModal}
        user={user}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        setCatches={setCatches}
      />
      <EditTripModal
        openEditTripModal={openEditTripModal}
        setOpenEditTripModal={setOpenEditTripModal}
        trip={trip}
        setTrip={setTrip}
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
        user={user}
      />
      <div className={pageStyles}>
        <InfoSection
          setOpenSelectDateModal={setOpenSelectDateModal}
          getTripDate={getTripDate}
          backgroundImage="bg-managetrips-image"
          title="Manage Your Fishing Trips"
          description="Create & manage your fishing trips. Select a date & add a new trip or select an existing one. Then create & manage catches made on your fishing trip. Catch records consist of relevant data such as fish caught, geographic coordinates, and weather conditions."
        />
        {trip && trip.id && trip.location && trip.date ? (
          <TripCard
            trip={trip}
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
            setOpenEditTripModal={setOpenEditTripModal}
            setOpenDeleteTripModal={setOpenDeleteTripModal}
            screenWidth={screenWidth}
          />
        ) : (
          <div className={idleContainerStyles}>
            <div className="mb-10">
              <h2 className="pl-2 font-title font-semibold text-slate-800 text-lg">
                Last Six Months:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 min-[1800px]:grid-cols-4">
                {Object.entries(tripsLastSixMonths).map(
                  ([monthYear, trips]) => (
                    <div className="p-2 m-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded-sm">
                      <h2 className="mb-2 font-title text-slate-200 border border-0 border-b-2 2xl:text-lg">
                        {monthYear}
                      </h2>
                      {trips.map((trip) => (
                        <p
                          className="pb-0.5 last:pb-0 font-paragraph text-sm 2xl:text-base"
                          key={trip.tripId}
                        >
                          <a
                            className="text-slate-300 cursor-pointer hover:no-underline hover:text-slate-50 active:text-slate-50"
                            data-key={trip.tripId}
                            onClick={(e) => {
                              const dataKey =
                                e.currentTarget.getAttribute("data-key");
                              handleRecentTrip(dataKey);
                            }}
                          >
                            {trip.bodyOfWater}, {trip.formattedDate}
                          </a>
                        </p>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className={idleLogoContainerStyles}>
              <img
                className={idleLogoImageStyles}
                src={Logo}
                alt="Man fishing in a row boat"
              />
              <h2 className={idleLogoNameStyles}>Fishing App</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageTrips;
