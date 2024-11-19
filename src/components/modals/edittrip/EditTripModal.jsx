import { useState } from "react";
import {
  handleTripInputValidation,
  handleLocationInputValidation,
  handleDateInputValidation,
} from "../../../lib/utilities/InputValidation";
import Button from "../shared/ModalButton.jsx";
import Form from "./shared/EditTripForm.jsx";
import SubmissionErrorMessage from "../shared/ModalErrorMessage.jsx";

function EditTripModal({
  openEditTripModal,
  setOpenEditTripModal,
  trip,
  setTrip,
  setTrips,
  tempTrip,
  setTempTrip,
  setTripDate,
  user,
  baseURL,
}) {
  if (!openEditTripModal) return null;

  const [editDate, setEditDate] = useState(new Date(handleDateConversion()));

  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState("");

  function handleLocationInput(currentLocation) {
    const isValid = handleLocationInputValidation(currentLocation);
    isValid ? setLocationErrorMessage("") : setLocationErrorMessage("Invalid");
    sanitizeTempTrip();
    clearFormSubmissionErrorMessage();
  }

  function handleDateInput(currentDate) {
    const isValid = handleDateInputValidation(formatDate(currentDate));
    isValid ? setDateErrorMessage("") : setDateErrorMessage("Invalid");
    sanitizeTempTrip();
    clearFormSubmissionErrorMessage();
  }

  function formatDate(date) {
    const [month, day, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }

  function sanitizeTempTrip() {
    for (const key in tempTrip) {
      if (typeof tempTrip[key] == "string") {
        tempTrip[key] = tempTrip[key].trim().replace(/\s+/g, " ");
      }
    }
  }

  function clearFormSubmissionErrorMessage() {
    if (handleTripInputValidation(tempTrip)) {
      setFormSubmissionErrorMessage("");
    }
  }

  function handleEditTripClick() {
    sanitizeTempTrip();
    const formattedDate = handleDateFormatting(editDate);
    if (
      handleTripInputValidation({
        location: tempTrip.location,
        date: formattedDate,
      })
    ) {
      const updatedTrip = { ...tempTrip, date: formattedDate };
      editTrip(updatedTrip);
      setOpenEditTripModal(false);
    } else {
      setFormSubmissionErrorMessage("One or more inputs are invalid");
    }
  }

  function handleCancelClick() {
    setOpenEditTripModal(false);
    setTempTrip({});
  }

  async function editTrip(updatedTrip) {
    const EDIT_TRIP_BY_ID = `${baseURL}/trips/${trip.id}?userId=${user.id}`;
    const token = localStorage.getItem("authToken");

    const convertedUpdatedTrip = {
      id: trip.id,
      date: updatedTrip.date,
      bodyOfWater: updatedTrip.location,
      user: { id: user.id },
    };

    try {
      const response = await fetch(EDIT_TRIP_BY_ID, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedUpdatedTrip),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();

      const resultingTrip = {
        id: result.tripId,
        location: result.bodyOfWater,
        date: result.date,
      };

      setTrip(resultingTrip);
      setTrips((currentTrips) =>
        currentTrips.map((tripObject) =>
          tripObject.id === trip.id
            ? { ...tripObject, ...resultingTrip }
            : tripObject
        )
      );
      setTempTrip({});
      setTripDate(); // triggers useEffect for fetching trips in ManageTrips component
      setOpenEditTripModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  /* 
  The function appends the time to the date object setting it to midnight.
  This ensures dates are consistent across all time zones in which they are set.

  @return String representing the date with appending time set to midnight.
  */
  function handleDateConversion() {
    const date = trip.date;
    const formattedDate = date + "T00:00:00";
    return formattedDate;
  }

  function handleDateFormatting(dateObject) {
    if (dateObject === null || dateObject === undefined || dateObject === "") {
      return;
    }
    const year = dateObject.getFullYear();
    // Month is zero-indexed
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObject.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="px-10 py-4 bg-slate-50 rounded-md font-paragraph md:-translate-x-32 shadow-md shadow-slate-950">
      <h2 className="mb-4 font-title text-xl font-semibold sm:text-2xl">
        Edit Current Trip
      </h2>
      <Form
        tempTrip={tempTrip}
        setTempTrip={setTempTrip}
        editDate={editDate}
        setEditDate={setEditDate}
        locationErrorMessage={locationErrorMessage}
        dateErrorMessage={dateErrorMessage}
        handleLocationInput={handleLocationInput}
        handleDateInput={handleDateInput}
      />
      <div className="mb-2">
        <SubmissionErrorMessage errorMessage={formSubmissionErrorMessage} />
      </div>
      <div className="flex justify-center items-center gap-x-4">
        <Button buttonText={"Edit"} handleClick={handleEditTripClick} />
        <Button buttonText={"Cancel"} handleClick={handleCancelClick} />
      </div>
    </div>
  );
}

export default EditTripModal;
