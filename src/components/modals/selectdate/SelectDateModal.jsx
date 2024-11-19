import { useState, useContext } from "react";
import {
  handleTripInputValidation,
  handleLocationInputValidation,
} from "../../../lib/utilities/InputValidation.jsx";
import Button from "../shared/ModalButton.jsx";
import Form from "./shared/SelectDateForm.jsx";
import ErrorMessage from "../shared/ModalErrorMessage.jsx";
import SelectTripCard from "./shared/SelectTripCard.jsx";
import { BaseURLContext } from "../../../lib/context/Context.jsx";

function SelectDateModal({
  openSelectDateModal,
  setOpenSelectDateModal,
  trips,
  setTrips,
  setTrip,
  tripDate,
  user,
}) {
  if (!openSelectDateModal) return null;

  const baseURL = useContext(BaseURLContext);

  const [location, setLocation] = useState();
  const [locationErrorMessage, setLocationErrorMessage] = useState("");

  function handleLocationInput(currentLocation) {
    const isValid = handleLocationInputValidation(currentLocation);
    isValid
      ? setLocationErrorMessage("")
      : setLocationErrorMessage("Location is invalid");
  }

  function handleAddTripClick() {
    if (location === null || location === undefined || location === "") {
      setLocationErrorMessage("Location is invalid");
      return;
    } else {
      const sanitizedLocation = location.trim().replace(/\s+/g, " ");
      setLocation(sanitizedLocation);
    }

    if (handleTripInputValidation({ location: location, date: tripDate })) {
      const newTrip = {
        date: tripDate,
        bodyOfWater: location,
        user: { id: user.id },
      };

      postNewTrip(newTrip);

      if (newTrip) {
        setOpenSelectDateModal(false);
      }
    } else {
      setLocationErrorMessage("Location is invalid");
    }
  }

  function handleCancelClick() {
    setOpenSelectDateModal(false);
  }

  function handleSelectTripClick(e) {
    const dataKey = e.currentTarget.getAttribute("data-key");
    setOpenSelectDateModal(false);

    const selectedTrip = trips[dataKey];
    const updatedTripObject = {
      id: selectedTrip.tripId,
      location: selectedTrip.bodyOfWater,
      date: selectedTrip.date,
    };
    setTrip(updatedTripObject);
  }

  async function postNewTrip(newTripData) {
    const POST_TRIP = `${baseURL}/trips?userId=${user.id}`;
    const token = localStorage.getItem("authToken");

    const tempId = Date.now();
    const tripWithTempId = { ...newTripData, id: tempId };

    setTrips([...trips, tripWithTempId]);

    try {
      const response = await fetch(POST_TRIP, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTripData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.error}`);
      }

      const result = await response.json();
      const newTrip = {
        id: result.tripId,
        location: result.bodyOfWater,
        date: result.date,
        user: { id: result.id },
      };
      setTrip(newTrip);
      setTrips((currentTrips) =>
        currentTrips.map((tripItem) =>
          tripItem.id === tempId ? result : tripItem
        )
      );
    } catch (error) {
      console.log(error);
      setTrips((currentTrips) =>
        currentTrips.filter((tripItem) => tripItem.id !== tempId)
      );
    }
  }

  /* Tailwind Class Styles */
  const tripTitleStyles = "mb-4 font-title text-xl font-semibold sm:text-2xl";
  /* End Tailwind Class Styles */

  return (
    <div className="p-4 bg-slate-50 rounded-sm font-paragraph md:-translate-x-32 shadow-md shadow-slate-950">
      <div className="mb-4 px-2 border border-0 border-b-4 border-slate-700 md:text-lg">
        <h2 className={tripTitleStyles}>Add a Trip</h2>
        <div className="mb-4 flex justify-between items-end">
          <Form
            setLocation={setLocation}
            handleLocationInput={handleLocationInput}
          />
          <div>
            <Button buttonText={"Add"} handleClick={handleAddTripClick} />
          </div>
        </div>
        <div>
          <ErrorMessage errorMessage={locationErrorMessage} />
        </div>
      </div>
      <div className="pb-4">
        <h2 className={tripTitleStyles}>Or Select an Existing Trip</h2>
        {trips.map((trip, index) => (
          <SelectTripCard
            key={trip.tripId}
            trip={trip}
            index={index}
            handleSelectTripClick={handleSelectTripClick}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Button buttonText={"Cancel"} handleClick={handleCancelClick} />
      </div>
    </div>
  );
}

export default SelectDateModal;
