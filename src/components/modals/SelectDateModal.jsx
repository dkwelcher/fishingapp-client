/* 
SelectDateModal.jsx is an intermediate dashboard component that displays a form for adding a new trip or selecting an existing trip.

@since 2024-03-18
*/

import { useState } from "react";
import {
  handleTripInputValidation,
  handleLocationInputValidation,
} from "../../lib/utilities/InputValidation";

/* 
SelectDateModal renders a container with a form for adding a new trip & dynamically displays existing trips associated with the given date.
It provides immediate feedback on input validation & delegates final input validation on submission to the local input valition file.

@param openSelectDateModal Boolean value that represents whether the select date modal is open or closed.
@param setOpenSelectDateModal Setter function that sets the openSelectDateModal to true or false.
@param trips An object array that contains trip objects.
@param setTrips Setter function that sets the trips state.
@param tripDate String that represents the date in YYYY-MM-DD format.
@param user An object that holds user properties.
@param baseURL String that represents the base URL of the server.
@return HTML that renders the container that holds the form specific to trip data &
        dynamically rendered trips with select buttons.
*/
function SelectDateModal({
  openSelectDateModal,
  setOpenSelectDateModal,
  trips,
  setTrips,
  setTrip,
  tripDate,
  user,
  baseURL,
}) {
  if (!openSelectDateModal) return null;

  // state that holds a String representing the name of a body of water.
  const [location, setLocation] = useState();

  // state that holds a boolean related to whether the input field is valid or invalid.
  const [locationErrorMessage, setLocationErrorMessage] = useState(false);

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message
  is set accordingly.

  @param currentLocation String representing the name of a body of water.
  */
  function handleLocationInput(currentLocation) {
    const isValid = handleLocationInputValidation(currentLocation);
    isValid
      ? setLocationErrorMessage("")
      : setLocationErrorMessage("Location is invalid");
  }

  /* 
  The function selects a trip from the trips object array according to the dataKey parameter.
  The selected trip is then processed to be set as the trip object state.
  */
  function handleSelectTrip(dataKey) {
    const selectedTrip = trips[dataKey];
    const updatedTripObject = {
      id: selectedTrip.tripId,
      location: selectedTrip.bodyOfWater,
      date: selectedTrip.date,
    };
    setTrip(updatedTripObject);
  }

  /* 
  The function processes the location state & prepares a new trip object for a POST request to the server.
  */
  function handleAddTrip() {
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

  /* 
  The asynchronous function makes a POST request to the server. If successful, then the server-returned trip object's properties are
  converted to client-specific properties for trip objects. The trip object is inserted into the trips array & the trips array is sorted.

  @param newTripData An object with trip properties.
  */
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
  const modalContainerStyles =
    "w-full h-screen fixed flex justify-center items-center bg-transparent-shadow text-slate-800 z-50";
  const modalCardStyles =
    "m-4 p-4 bg-slate-50 rounded-sm font-paragraph md:-translate-x-32 shadow-md shadow-slate-950";
  const userActionContainerStyles = " ";
  const addTripContainerStyles =
    "mb-4 px-2 border border-0 border-b-4 border-slate-700 md:text-lg";
  const tripTitleStyles = "mb-4 font-title text-xl font-semibold sm:text-2xl";
  const userActionSubContainerStyles = "mb-4 flex justify-between items-end";
  const inputStyles =
    "mr-2 py-1 bg-slate-50 border border-solid border-slate-400 rounded-sm focus:bg-slate-200 focus:text-slate-900 shadow-sm shadow-slate-600 outline-none";
  const inputErrorMessageStyles = "text-red-600";
  const buttonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm shadow-md shadow-slate-600 hover:bg-slate-700";
  const existingTripContainerStyles = "pb-4";
  const existingTripSubContainerStyles =
    "mb-2 flex justify-between items-center p-2 border border-slate-700 text-sm rounded-sm";
  const existingTripTitleStyles = "font-title text-lg font-semibold sm:text-xl";
  const buttonContainerStyles = "flex justify-center items-center";
  /* End Tailwind Class Styles */

  return (
    <div className={modalContainerStyles}>
      <div className={modalCardStyles}>
        <div className={userActionContainerStyles}>
          <div className={addTripContainerStyles}>
            <h2 className={tripTitleStyles}>Add a Trip</h2>
            <div className={userActionSubContainerStyles}>
              <div>
                <label className="mr-2" htmlFor="">
                  Location:
                </label>
                <input
                  className={inputStyles}
                  type="text"
                  onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  onBlur={(e) => handleLocationInput(e.target.value)}
                />
              </div>
              <div>
                <button
                  className={buttonStyles}
                  onClick={() => {
                    handleAddTrip();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <div>
              <p
                className={`pb-2 text-red-600 text-center ${
                  locationErrorMessage.length > 0 ? "visible" : "hidden"
                }`}
              >
                {locationErrorMessage}
                {"."}
              </p>
            </div>
          </div>
          <div className={existingTripContainerStyles}>
            <h2 className={tripTitleStyles}>Or Select an Existing Trip</h2>
            {trips.map((trip, i) => (
              <div className={existingTripSubContainerStyles} key={trip.id}>
                <div>
                  <h2 className={existingTripTitleStyles}>
                    {trip.bodyOfWater}
                  </h2>
                  <p>{trip.date}</p>
                </div>
                <div>
                  <button
                    className={buttonStyles}
                    data-key={i}
                    onClick={(e) => {
                      const dataKey = e.currentTarget.getAttribute("data-key");
                      setOpenSelectDateModal(false);
                      handleSelectTrip(dataKey);
                    }}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={buttonContainerStyles}>
            <button
              className={buttonStyles}
              onClick={() => {
                setOpenSelectDateModal(false);
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

export default SelectDateModal;
