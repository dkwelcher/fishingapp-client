/* 
AddCatchModal.jsx is a intermediate dashboard component that displays a form for adding a new catch.

@since 2024-03-19
*/

import { useState, useEffect } from "react";
import {
  handleCatchInputValidation,
  handleTimeInputValidation,
  handleFishInputValidation,
  handleBaitInputValidation,
  handleLatitudeInputValidation,
  handleLongitudeInputValidation,
  handleWeatherInputValidation,
  handleAirTempInputValidation,
  handleWaterTempInputValidation,
  handleWindSpeedInputValidation,
} from "../../lib/utilities/InputValidation";

/* 
AddCatchModal renders a container with a form for adding a new catch to the associated trip. It provides immediate feedback on input validation &
delegates final input validation on submission to the local input validation file.

@param openAddCatchModal Boolean value that represents whether the add catch modal is open or closed.
@param setOpenAddCatchModal Setter function that sets the openAddCatchModal to true or false.
@param user An object that holds user properties.
@param trip An object that holds trip properties.
@param setCatches Setter function that sets the catches object array.
@param baseURL String that represents the base URL of the server.
@return HTML that renders the container that holds a form specific to catch data.
*/
function AddCatchModal({
  openAddCatchModal,
  setOpenAddCatchModal,
  user,
  trip,
  setCatches,
  baseURL,
}) {
  if (!openAddCatchModal) return null;

  // state that holds an object with catch properties & a default weather property of "clear".
  const [newCatch, setNewCatch] = useState({ weather: "clear" });

  // states that hold booleans related to whether an input field is valid or invalid.
  const [timeErrorMessage, setTimeErrorMessage] = useState(false);
  const [fishErrorMessage, setFishErrorMessage] = useState(false);
  const [baitErrorMessage, setBaitErrorMessage] = useState(false);
  const [latitudeErrorMessage, setLatitudeErrorMessage] = useState(false);
  const [longitudeErrorMessage, setLongitudeErrorMessage] = useState(false);
  const [weatherErrorMessage, setWeatherErrorMessage] = useState(false);
  const [airTempErrorMessage, setAirTempErrorMessage] = useState(false);
  const [waterTempErrorMessage, setWaterTempErrorMessage] = useState(false);
  const [windSpeedErrorMessage, setWindSpeedErrorMessage] = useState(false);

  // state that holds a boolean related to whether any input fields are valid or invalid.
  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState(false);

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempCatch state is sanitized, then the formSubmissionErrorMessage state is set to undefined.  
  */
  function handleTimeInput(currentTime) {
    const isValid = handleTimeInputValidation(currentTime);
    isValid ? setTimeErrorMessage("") : setTimeErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempCatch state is sanitized, then the formSubmissionErrorMessage state is set to undefined.  
  */
  function handleFishInput(currentFish) {
    const isValid = handleFishInputValidation(currentFish);
    isValid ? setFishErrorMessage("") : setFishErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempCatch state is sanitized, then the formSubmissionErrorMessage state is set to undefined.  
  */
  function handleBaitInput(currentBait) {
    const isValid = handleBaitInputValidation(currentBait);
    isValid ? setBaitErrorMessage("") : setBaitErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  function handleLatitudeInput(currentLatitude) {
    const isValid = handleLatitudeInputValidation(currentLatitude);
    isValid ? setLatitudeErrorMessage("") : setLatitudeErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempCatch state is sanitized, then the formSubmissionErrorMessage state is set to undefined.  
  */
  function handleLongitudeInput(currentLongitude) {
    const isValid = handleLongitudeInputValidation(currentLongitude);
    isValid
      ? setLongitudeErrorMessage("")
      : setLongitudeErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempCatch state is sanitized, then the formSubmissionErrorMessage state is set to undefined.  
  */
  function handleWeatherInput(currentWeather) {
    const isValid = handleWeatherInputValidation(currentWeather);
    isValid ? setWeatherErrorMessage("") : setWeatherErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempCatch state is sanitized, then the formSubmissionErrorMessage state is set to undefined.  
  */
  function handleAirTempInput(currentAirTemp) {
    const isValid = handleAirTempInputValidation(currentAirTemp);
    isValid ? setAirTempErrorMessage("") : setAirTempErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempCatch state is sanitized, then the formSubmissionErrorMessage state is set to undefined.  
  */
  function handleWaterTempInput(currentWaterTemp) {
    const isValid = handleWaterTempInputValidation(currentWaterTemp);
    isValid
      ? setWaterTempErrorMessage("")
      : setWaterTempErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempCatch state is sanitized, then the formSubmissionErrorMessage state is set to undefined.  
  */
  function handleWindSpeedInput(currentWindSpeed) {
    const isValid = handleWindSpeedInputValidation(currentWindSpeed);
    isValid
      ? setWindSpeedErrorMessage("")
      : setWindSpeedErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function sets the formSubmissionErrorMessage to an empty String if the newCatch object is valid.
  */
  function clearFormSubmissionErrorMessage() {
    if (handleCatchInputValidation(newCatch)) {
      setFormSubmissionErrorMessage("");
    }
  }

  /* 
  The function trims all String-value properties of the newCatch object.
  */
  function sanitizeTempCatch() {
    for (const key in newCatch) {
      if (typeof newCatch[key] == "string") {
        newCatch[key] = newCatch[key].trim().replace(/\s+/g, " ");
      }
    }
  }

  /* 
  The function processes the catch object & prepares it for a POST request to the server.
  */
  function handlesNewCatch() {
    sanitizeTempCatch();
    if (handleCatchInputValidation(newCatch)) {
      const newCatchPost = {
        time: `${newCatch.time}:00`,
        latitude: newCatch.latitude,
        longitude: newCatch.longitude,
        species: newCatch.fish,
        lureOrBait: newCatch.bait,
        weatherCondition: newCatch.weather,
        airTemperature: newCatch.airTemp,
        waterTemperature: newCatch.waterTemp,
        windSpeed: newCatch.windSpeed,
        trip: {
          tripId: trip.id,
          user: {
            id: user.id,
          },
        },
      };
      postNewCatch(newCatchPost);

      setOpenAddCatchModal(false);
    } else {
      setFormSubmissionErrorMessage("One or more input fields are invalid");
    }
  }

  /* 
  The asynchronous function makes a POST request to the server. If successful, then the server-returned catch object's properties are
  converted to client-specific properties for catch objects. The catch object is inserted into the catches array & the catches array is sorted.

  @param newCatchData An object with catch properties.
  */
  async function postNewCatch(newCatchData) {
    const POST_CATCH = `${baseURL}/catches?userId=${user.id}`;
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(POST_CATCH, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCatchData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.error}`);
      }

      const result = await response.json();
      const newCatchItem = {
        id: result.catchId,
        time: result.time.substring(0, 5),
        fish: result.species,
        bait: result.lureOrBait,
        latitude: result.latitude,
        longitude: result.longitude,
        weather: result.weatherCondition,
        airTemp: result.airTemperature,
        waterTemp: result.waterTemperature,
        windSpeed: result.windSpeed,
      };
      sortCatches(newCatchItem);
      setNewCatch({});
    } catch (error) {
      console.log(error);
    }
  }

  /* 
  The function updates the catches state by sorting the catches object array with the newly inserted catch object.

  @param newCatchItem An object containing catch properties.
  */
  function sortCatches(newCatchItem) {
    setCatches((currentCatches) => {
      const updatedCatches = [...currentCatches, newCatchItem];
      return updatedCatches.sort((a, b) => {
        const [hoursA, minutesA] = a.time.split(":").map(Number);
        const [hoursB, minutesB] = b.time.split(":").map(Number);
        const totalMinutesA = hoursA * 60 + minutesA;
        const totalMinutesB = hoursB * 60 + minutesB;

        return totalMinutesA - totalMinutesB;
      });
    });
  }

  /* 
  The useEffect creates a new Date object with a specified time format & sets the default time property of newCatch.
  */
  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setNewCatch((prevState) => ({ ...prevState, time: currentTime }));
  }, []);

  // state that holds an object with properties related to geolocation. The default states are set to indicate the state has not been changed according to user device geolocation data.
  const [geolocation, setGeolocation] = useState({
    loaded: false,
    isSuccess: false,
    coordinates: { lat: "", long: "" },
  });

  /* 
  The function takes data from the built-in navigator.geolocation JavaScript feature & modifies the existing geolocation state.
  Then the function sets the newCatch state with the provided latitude & longitude data.

  @param position An object with properties related to navigator.geolocation JavaScript feature.
  */
  function onGeolocationSuccess(position) {
    setGeolocation({
      loaded: true,
      isSuccess: true,
      coordinates: {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      },
    });
    setNewCatch((prevState) => ({
      ...prevState,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }));
  }

  /* 
  The function sets the geolocation state with data indicating that the navigator.geolocation is allowed, but
  cannot retrieve the user's data.

  @param error String representing error received from navigator.geolocation on unsuccessful function call.
  */
  function onGeolocationError(error) {
    setGeolocation({
      loaded: true,
      isSuccess: false,
      error,
    });
  }

  /* 
  The useEffect triggers the built-in navigator.geolocation feature to obtain the user device's geographic coordinates once on component mount.
  */
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onGeolocationError({
        message: "Geolocation is not supported",
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        onGeolocationSuccess,
        onGeolocationError
      );
    }
  }, []);

  /* 
  The useEffect makes a GET post to the server to obtain weather-related data with the given latitude & longitude.
  It is triggered once on component mount. If successful, then the corresponding user input fields are populated with
  data return from the server.
  */
  useEffect(() => {
    const getCurrentWeather = async (latitude, longitude) => {
      const GET_CURRENT_WEATHER = `${baseURL}/weather?userId=${user.id}&latitude=${latitude}&longitude=${longitude}`;
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(GET_CURRENT_WEATHER, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();
        if (result.weatherCondition !== "unknown") {
          setNewCatch((prev) => ({
            ...prev,
            weather: result.weatherCondition,
          }));
        }
        updateNewCatchOnWeatherResponse(result);
      } catch (error) {
        console.log(error);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        getCurrentWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  /* 
  The function force updates the newCatch state with properties from the formal parameter

  @param response An object with catch-related properties.
  */
  function updateNewCatchOnWeatherResponse(response) {
    setNewCatch((prevState) => ({
      ...prevState,
      airTemp: Math.round(response.airTemperature),
      waterTemp: Math.round(response.waterTemperature),
      windSpeed: Math.round(response.windSpeed),
    }));
  }

  /* Tailwind Class Styles */
  const modalContainerStyles =
    "w-full h-screen fixed flex justify-center items-center bg-transparent-shadow text-slate-800 text-sm z-50";
  const modalCardStyles =
    "px-10 py-4 bg-slate-50 rounded-md font-paragraph md:-translate-x-32 shadow-md shadow-slate-950";
  const formContainerStyles = "";
  const formTitleStyles = "pb-4 font-title text-xl font-semibold sm:text-2xl";
  const formStyles = "sm:grid sm:grid-cols-2 gap-x-4";
  const inputContainerStyles = "flex flex-col";
  const labelStyles = "pt-1 sm:text-lg";
  const inputStyles =
    "px-2 py-1 bg-slate-50 border border-solid border-slate-400 rounded-sm shadow-sm shadow-slate-600 focus:bg-slate-200 focus:text-slate-900 outline-none";
  const inputErrorMessageStyles = "text-red-600";
  const buttonContainerStyles = "flex justify-center items-center gap-x-4";
  const buttonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm shadow-md shadow-slate-600 hover:bg-slate-700";
  /* End Tailwind Class Styles */

  return (
    <div className={modalContainerStyles}>
      <div className={modalCardStyles}>
        <div className={formContainerStyles}>
          <h2 className={formTitleStyles}>Add a Catch</h2>
          <form className={formStyles} action="">
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Time:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {timeErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="time"
                value={newCatch.time ?? ""}
                onChange={(e) =>
                  setNewCatch({ ...newCatch, time: e.target.value })
                }
                onBlur={(e) => handleTimeInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Fish:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {fishErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="text"
                onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
                onChange={(e) =>
                  setNewCatch({ ...newCatch, fish: e.target.value })
                }
                onBlur={(e) => handleFishInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Bait / Lure:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {baitErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="text"
                onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
                onChange={(e) =>
                  setNewCatch({ ...newCatch, bait: e.target.value })
                }
                onBlur={(e) => handleBaitInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Weather:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {weatherErrorMessage}
                  </span>
                }
              </label>
              <select
                className={inputStyles}
                type="text"
                onChange={(e) =>
                  setNewCatch({ ...newCatch, weather: e.target.value })
                }
                onBlur={(e) => handleWeatherInput(e.target.value)}
              >
                <option value="clear">clear</option>
                <option value="partly cloudy">partly cloudy</option>
                <option value="cloudy">cloudy</option>
                <option value="overcast">overcast</option>
                <option value="light precipitation">light precipitation</option>
                <option value="moderate precipitation">
                  moderate precipitation
                </option>
                <option value="heavy precipitation">heavy precipitation</option>
              </select>
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Latitude:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {latitudeErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="number"
                value={newCatch.latitude ?? ""}
                onKeyDown={(e) => preventPlus(e)}
                onChange={(e) =>
                  setNewCatch({ ...newCatch, latitude: e.target.value })
                }
                onBlur={(e) => handleLatitudeInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Longitude:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {longitudeErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="number"
                value={newCatch.longitude ?? ""}
                onKeyDown={(e) => preventPlus(e)}
                onChange={(e) =>
                  setNewCatch({ ...newCatch, longitude: e.target.value })
                }
                onBlur={(e) => handleLongitudeInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Air Temp (&deg;F):{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {airTempErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="number"
                value={newCatch.airTemp ?? ""}
                onKeyDown={(e) => preventDecimalAndPlus(e)}
                onChange={(e) =>
                  setNewCatch({ ...newCatch, airTemp: e.target.value })
                }
                onBlur={(e) => handleAirTempInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Water Temp (&deg;F):{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {waterTempErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="number"
                value={newCatch.waterTemp ?? ""}
                onKeyDown={(e) => preventDecimalAndPlus(e)}
                onChange={(e) =>
                  setNewCatch({ ...newCatch, waterTemp: e.target.value })
                }
                onBlur={(e) => handleWaterTempInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Wind Speed (MPH):{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {windSpeedErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="number"
                value={newCatch.windSpeed ?? ""}
                onKeyDown={(e) => preventDecimalAndPlusAndMinus(e)}
                onChange={(e) =>
                  setNewCatch({ ...newCatch, windSpeed: e.target.value })
                }
                onBlur={(e) => handleWindSpeedInput(e.target.value)}
              />
            </div>
          </form>
          <div>
            <p
              className={`py-2 text-red-600 text-center ${
                formSubmissionErrorMessage.length > 0 ? "visible" : "invisible"
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
                handlesNewCatch();
              }}
            >
              Add
            </button>
            <button
              className={buttonStyles}
              onClick={() => {
                setOpenAddCatchModal(false);
                setNewCatch({ weather: "clear" });
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

/* 
The function prevents the user from inputting decimal, plus, & minus characters.

@param e A KeyBoard Event.
*/
function preventDecimalAndPlusAndMinus(e) {
  if (e.key === "." || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
}

/* 
The function prevents the user from inputting decimal & plus characters.

@param e A KeyBoard Event.
*/
function preventDecimalAndPlus(e) {
  if (e.key === "." || e.key == "+") {
    e.preventDefault();
  }
}

/* 
The function prevents the user from inputting the plus character.

@param e A KeyBoard Event.
*/
function preventPlus(e) {
  if (e.key === "+") {
    e.preventDefault();
  }
}

export default AddCatchModal;
