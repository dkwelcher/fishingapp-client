/* 
EditTripModal.jsx is an intermediate dashboard component that displays a form for editing an existing trip.

@since 2024-03-18
*/

import { useState } from "react";
import {
  handleTripInputValidation,
  handleLocationInputValidation,
  handleDateInputValidation,
} from "../../lib/utilities/InputValidation";
import DatePicker from "react-datepicker";

/* 
EditTripModal renders a container with a form for editing an existing trip. It provides immediate feedback on input validation &
delegates final input validation on submission to the local input validation file.

@param openEditTripModal Boolean value that represents whether the edit trip modal is open or closed.
@param setOpenEditTripModal Setter function that sets the openEditTripModal to true or false.
@param trip An object that holds trip properties.
@param setTrip Setter function that sets the trip state.
@param setTrips Setter function that sets the trips state.
@param tempTrip An object that holds trip properties temporarily for user-made editing & deletion.
@param setTempTrip Setter function that sets the tempTrip state.
@param setTripDate Setter function that sets the tripDate state.
@param user An object that holds user properties.
@param baseURL String that represents the base URL of the server.
@return HTML that renders the container that holds a form specific to trip data.
*/
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

  // states that hold booleans related to whether an input field is valid or invalid.
  const [locationErrorMessage, setLocationErrorMessage] = useState(false);
  const [dateErrorMessage, setDateErrorMessage] = useState(false);

  // state that holds a boolean related to whether any input fields are valid or invalid.
  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState(false);

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempTrip state is sanitized, then the formSubmissionErrorMessage state is set to undefined.
  
  @param currentLocation String representing the name of a body of water.
  */
  function handleLocationInput(currentLocation) {
    const isValid = handleLocationInputValidation(currentLocation);
    isValid ? setLocationErrorMessage("") : setLocationErrorMessage("Invalid");
    sanitizeTempTrip();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempTrip state is sanitized, then the formSubmissionErrorMessage state is set to undefined.
  
  @param currentDate String representing a date.
  */
  function handleDateInput(currentDate) {
    const isValid = handleDateInputValidation(currentDate);
    isValid ? setDateErrorMessage("") : setDateErrorMessage("Invalid");
    sanitizeTempTrip();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function trims all String-value properties of the tempTrip object.
  */
  function sanitizeTempTrip() {
    for (const key in tempTrip) {
      if (typeof tempTrip[key] == "string") {
        tempTrip[key] = tempTrip[key].trim().replace(/\s+/g, " ");
      }
    }
  }

  /* 
  The function sets the formSubmissionErrorMessage to an empty String if the tempTrip object is valid.
  */
  function clearFormSubmissionErrorMessage() {
    if (handleTripInputValidation(tempTrip)) {
      setFormSubmissionErrorMessage("");
    }
  }

  /* 
  The function processes the trip object & prepares it for a PUT request to the server.
  */
  function handleEditTrip() {
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

  /* 
  The asynchronous function makes a PUT request to the server. If successful, then the server-returned trip object's properties are
  converted to client-specific properties for trip objects. The trip object is inserted into the trips array & the trips array is sorted.

  @param updatedTrip An object with trip properties.
  */
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

  // state that holds a Date object to be modified by the user.
  const [editDate, setEditDate] = useState(new Date(handleDateConversion()));

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

  /* 
  The function converts a date object into a YYYY-MM-DD formatted String

  @param date A Date object.
  @return String formatted to YYYY-MM-DD.
  */
  function handleDateFormatting(date) {
    if (date === null || date === undefined || date === "") {
      return;
    }
    const year = date.getFullYear();
    // Month is zero-indexed
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  /* Tailwind Class Styles */
  const modalContainerStyles =
    "w-full h-screen fixed flex justify-center items-center bg-transparent-shadow text-slate-800 z-50";
  const modalCardStyles =
    "px-10 py-4 bg-slate-50 rounded-md font-paragraph md:-translate-x-32 shadow-md shadow-slate-950";
  const formContainerStyles = "";
  const formTitleStyles = "mb-4 font-title text-xl font-semibold sm:text-2xl";
  const inputContainerStyles = "flex flex-col md:text-lg";
  const datePickerContainerStyles = "";
  const inputStyles =
    "mb-4 px-2 py-1 bg-slate-50 border border-solid border-slate-400 rounded-sm shadow-sm shadow-slate-600  focus:bg-slate-200 focus:text-slate-900 outline-none";
  const inputErrorMessageStyles = "text-red-600";
  const buttonContainerStyles = "flex justify-center items-center gap-x-4";
  const buttonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm shadow-md shadow-slate-600 hover:bg-slate-700";
  /* End Tailwind Class Styles */

  return (
    <div className={modalContainerStyles}>
      <div className={modalCardStyles}>
        <div className={formContainerStyles}>
          <h2 className={formTitleStyles}>Edit Current Trip</h2>
          <form action="">
            <div className={inputContainerStyles}>
              <label htmlFor="">
                Location:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {locationErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="text"
                value={tempTrip.location}
                onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
                onChange={(e) =>
                  setTempTrip({ ...tempTrip, location: e.target.value })
                }
                onBlur={(e) => handleLocationInput(e.target.value)}
              />
              <label htmlFor="">
                Date:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {dateErrorMessage}
                  </span>
                }
              </label>
              <div className={datePickerContainerStyles}>
                <DatePicker
                  className={inputStyles}
                  showIcon
                  selected={editDate}
                  onChange={(date) => setEditDate(date)}
                  onBlur={(e) => handleDateInput(e.target.value)}
                />
              </div>
            </div>
          </form>
          <div>
            <p
              className={`pb-2 text-red-600 text-center ${
                formSubmissionErrorMessage.length > 0 ? "visible" : "hidden"
              }`}
            >
              {formSubmissionErrorMessage}
              {"."}
            </p>
          </div>
          <div className={buttonContainerStyles}>
            <button
              className={buttonStyles}
              onClick={() => {
                handleEditTrip();
              }}
            >
              Edit
            </button>
            <button
              className={buttonStyles}
              onClick={() => {
                setOpenEditTripModal(false);
                setTempTrip({});
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
The function prevents the user from inputting digits and special characters.

@param e A KeyBoard Event.
*/
function preventDigitAndSpecialCharacters(e) {
  // Letters & spaces only
  if (!/[a-zA-Z ]/.test(e.key)) {
    e.preventDefault();
  }
}

export default EditTripModal;
