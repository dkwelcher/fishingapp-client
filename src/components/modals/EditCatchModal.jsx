/* 
EditCatchModal.jsx is an intermediate dashboard component that displays a form for editing an existing catch.

@since 2024-03-19
*/

import { useState } from "react";
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
EditCatchModal renders a container with a form for editing an existing catch. It provides immediate feedback on input validation &
delegates final input validation on submission to the local input validation file.

@param openEditCatchModal Boolean value that represents whether the edit catch modal is open or closed.
@parem setOpenEditCatchModal Setter function that sets the openEditCatchModal to true or false.
@param user An object that holds user properties.
@param trip An object that holds trip properties.
@param setTempCatch Setter function that sets the tempCatch state.
@param setCatches Setter function that sets the catches state.
@param baseURL String that represents the base URL of the server.
@return HTML that renders the container that holds a form specific to catch data.
*/
function EditCatchModal({
  openEditCatchModal,
  setOpenEditCatchModal,
  user,
  trip,
  tempCatch,
  setTempCatch,
  setCatches,
  baseURL,
}) {
  if (!openEditCatchModal) return null;

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
  
  @param currentTime String representing a formatted time.
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
  
  @param currentFish String representing a type of fish.
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
  
  @param currentBait String representing a type of bait.
  */
  function handleBaitInput(currentBait) {
    const isValid = handleBaitInputValidation(currentBait);
    isValid ? setBaitErrorMessage("") : setBaitErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempCatch state is sanitized, then the formSubmissionErrorMessage state is set to undefined.  
  
  @param currentLatitude String representing a latitude coordinate
  */
  function handleLatitudeInput(currentLatitude) {
    const isValid = handleLatitudeInputValidation(currentLatitude);
    isValid ? setLatitudeErrorMessage("") : setLatitudeErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  /* 
  The function determines whether the formal parameter is valid. The corresponding error message is set accordingly.
  The tempCatch state is sanitized, then the formSubmissionErrorMessage state is set to undefined.  
  
  @param currentLongitude String representing a longitude coordinate.
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
  
  @param currentWeather String representing a weather condition.
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
  
  @param currentAirTemp String representing an air temperature integer value.
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
  
  @param currentWaterTemp String representing a water temperature integer value.
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
  
  @param currentWindSpeed String representing a wind speed integer value.
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
  The function sets the formSubmissionErrorMessage to an empty String if the tempCatch object is valid.
  */
  function clearFormSubmissionErrorMessage() {
    if (handleCatchInputValidation(tempCatch)) {
      setFormSubmissionErrorMessage("");
    }
  }

  /* 
  The function trims all String-value properties of the tempCatch object.
  */
  function sanitizeTempCatch() {
    for (const key in tempCatch) {
      if (typeof tempCatch[key] == "string") {
        tempCatch[key] = tempCatch[key].trim().replace(/\s+/g, " ");
      }
    }
  }

  /* 
  The function processes the catch object & prepares it for a PUT request to the server.
  */
  function handleCatches() {
    sanitizeTempCatch();
    if (handleCatchInputValidation(tempCatch)) {
      const updatedCatchPost = {
        id: tempCatch.id,
        time: `${tempCatch.time}:00`,
        latitude: tempCatch.latitude,
        longitude: tempCatch.longitude,
        species: tempCatch.fish,
        lureOrBait: tempCatch.bait,
        weatherCondition: tempCatch.weather,
        airTemperature: tempCatch.airTemp,
        waterTemperature: tempCatch.waterTemp,
        windSpeed: tempCatch.windSpeed,
        trip: {
          tripId: trip.id,
          user: {
            id: user.id,
          },
        },
      };
      editCatch(updatedCatchPost);

      setOpenEditCatchModal(false);
    } else {
      setFormSubmissionErrorMessage("One or more input fields are invalid");
    }
  }

  /* 
  The asynchronous function makes a PUT request to the server. If successful, then the server-returned catch object's properties are
  converted to client-specific properties for catch objects. The catch object is inserted into the catches array & the catches array is sorted.

  @param updatedCatchData An object with catch properties.
  */
  async function editCatch(updatedCatchData) {
    const EDIT_CATCH_BY_ID = `${baseURL}/catches/${tempCatch.id}?userId=${user.id}`;
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(EDIT_CATCH_BY_ID, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCatchData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();

      const resultingCatch = {
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

      setCatches((currentCatches) =>
        currentCatches.map((catchObject) =>
          catchObject.id === resultingCatch.id
            ? { ...catchObject, ...resultingCatch }
            : catchObject
        )
      );
      sortCatches();
      setTempCatch({});
    } catch (error) {
      console.log(error);
    }
  }

  /* 
  The function updates the catches state by sorting the catches object array.
  */
  function sortCatches() {
    setCatches((catches) => {
      return catches.sort((a, b) => {
        const [hoursA, minutesA] = a.time.split(":").map(Number);
        const [hoursB, minutesB] = b.time.split(":").map(Number);
        const totalMinutesA = hoursA * 60 + minutesA;
        const totalMinutesB = hoursB * 60 + minutesB;

        return totalMinutesA - totalMinutesB;
      });
    });
  }

  /* Tailwind Class Styles */
  const modalContainerStyles =
    "w-full h-screen fixed flex justify-center items-center bg-transparent-shadow text-slate-800 z-50";
  const modalCardStyles =
    "px-10 py-4 bg-slate-50 rounded-md font-paragraph md:-translate-x-32 shadow-md shadow-slate-950";
  const formContainerStyles = "";
  const formTitleStyles = "mb-4 font-title text-xl font-semibold sm:text-2xl";
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
          <h2 className={formTitleStyles}>Edit a Catch</h2>
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
                value={tempCatch.time}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, time: e.target.value })
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
                value={tempCatch.fish}
                onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, fish: e.target.value })
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
                value={tempCatch.bait}
                onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, bait: e.target.value })
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
                value={tempCatch.weather}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, weather: e.target.value })
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
                value={tempCatch.latitude}
                onKeyDown={(e) => preventPlus(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, latitude: e.target.value })
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
                value={tempCatch.longitude}
                onKeyDown={(e) => preventPlus(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, longitude: e.target.value })
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
                value={tempCatch.airTemp}
                onKeyDown={(e) => preventDecimalAndPlus(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, airTemp: e.target.value })
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
                value={tempCatch.waterTemp}
                onKeyDown={(e) => preventDecimalAndPlus(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, waterTemp: e.target.value })
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
                value={tempCatch.windSpeed}
                onKeyDown={(e) => preventDecimalAndPlusAndMinus(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, windSpeed: e.target.value })
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
                handleCatches();
              }}
            >
              Edit
            </button>
            <button
              className={buttonStyles}
              onClick={() => {
                setOpenEditCatchModal(false);
                setTempCatch({});
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

export default EditCatchModal;
