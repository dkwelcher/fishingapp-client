import { useEffect, useState } from "react";
import SelectDateModal from "../../../modals/SelectDateModal";
import AddCatchModal from "../../../modals/AddCatchModal";
import EditCatchModal from "../../../modals/EditCatchModal";
import DeleteCatchModal from "../../../modals/DeleteCatchModal";
import EditTripModal from "../../../modals/EditTripModal";
import DeleteTripModal from "../../../modals/DeleteTripModal";
import TripCard from "../../cards/TripCard";
import ManageTripsText from "./shared/ManageTripsText.jsx";
import DateSearch from "./shared/DateSearch.jsx";
import RecentTrips from "./shared/RecentTrips.jsx";

function ManageTrips({ user, screenWidth, baseURL }) {
  const [openSelectDateModal, setOpenSelectDateModal] = useState(false);
  const [openAddCatchModal, setOpenAddCatchModal] = useState(false);
  const [openEditCatchModal, setOpenEditCatchModal] = useState(false);
  const [openDeleteCatchModal, setOpenDeleteCatchModal] = useState(false);
  const [openEditTripModal, setOpenEditTripModal] = useState(false);
  const [openDeleteTripModal, setOpenDeleteTripModal] = useState(false);

  const [tripDate, setTripDate] = useState();
  const [trips, setTrips] = useState([]);
  const [trip, setTrip] = useState({});
  const [tempTrip, setTempTrip] = useState({});

  const [catches, setCatches] = useState([]);
  const [tempCatch, setTempCatch] = useState({});

  const [tripsLastSixMonths, setTripsLastSixMonths] = useState([]);

  /* 
  The useEffect makes a GET request to the server to obtain trips associated with a trip date & the
  specific user. If successful, the trips state is changed to the server-returned trips.
  */
  useEffect(() => {
    const fetchTrips = async () => {
      if (!tripDate || !user.id) return;

      const GET_TRIPS_BY_ID = `${baseURL}/trips?userId=${user.id}&date=${tripDate}`;

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
        console.log(error);
      }
    };

    fetchTrips();
  }, [tripDate, user.id]);

  /* 
  The useEffect makes a GET request to the server obtain catches associated with a specified trip id &
  user id. If successful, the returned catch objects' properties are converted to client-recognized properties,
  then the catches state is changed to the newly converted catches object array.
  */
  useEffect(() => {
    const fetchCatches = async () => {
      if (!trip || !trip.id) return;

      const GET_CATCHES_BY_TRIP_ID = `${baseURL}/catches?userId=${user.id}&tripId=${trip.id}`;
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
        console.log(error);
      }
    };

    fetchCatches();
  }, [trip]);

  /* 
  sortCatches is updates the catches state with a sorted array of existing catches.
  */
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

      const GET_TRIPS_BY_USER_ID = `${baseURL}/trips/sixMonths?userId=${user.id}`;
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
        baseURL={baseURL}
      />
      <AddCatchModal
        openAddCatchModal={openAddCatchModal}
        setOpenAddCatchModal={setOpenAddCatchModal}
        user={user}
        trip={trip}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        setCatches={setCatches}
        baseURL={baseURL}
      />
      <EditCatchModal
        openEditCatchModal={openEditCatchModal}
        setOpenEditCatchModal={setOpenEditCatchModal}
        user={user}
        trip={trip}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        setCatches={setCatches}
        baseURL={baseURL}
      />
      <DeleteCatchModal
        openDeleteCatchModal={openDeleteCatchModal}
        setOpenDeleteCatchModal={setOpenDeleteCatchModal}
        user={user}
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        setCatches={setCatches}
        baseURL={baseURL}
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
        baseURL={baseURL}
      />
      <DeleteTripModal
        openDeleteTripModal={openDeleteTripModal}
        setOpenDeleteTripModal={setOpenDeleteTripModal}
        trip={trip}
        setTrip={setTrip}
        setTripDate={setTripDate}
        user={user}
        baseURL={baseURL}
      />
      <div className="bg-slate-100 text-slate-800">
        <div className="flex flex-col justify-center items-left px-4 pt-12 pb-4 bg-cover bg-center text-white bg-managetrips-image md:py-12 md:px-4 shadow-md shadow-slate-800">
          <ManageTripsText />
          <DateSearch
            setOpenSelectDateModal={setOpenSelectDateModal}
            setTripDate={setTripDate}
            setTrip={setTrip}
          />
        </div>
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
          <RecentTrips
            tripsLastSixMonths={tripsLastSixMonths}
            handleRecentTrip={handleRecentTrip}
          />
        )}
      </div>
    </div>
  );
}

export default ManageTrips;
