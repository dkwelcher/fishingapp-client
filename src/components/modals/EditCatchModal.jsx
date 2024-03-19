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

  const [timeErrorMessage, setTimeErrorMessage] = useState(false);
  const [fishErrorMessage, setFishErrorMessage] = useState(false);
  const [baitErrorMessage, setBaitErrorMessage] = useState(false);
  const [latitudeErrorMessage, setLatitudeErrorMessage] = useState(false);
  const [longitudeErrorMessage, setLongitudeErrorMessage] = useState(false);
  const [weatherErrorMessage, setWeatherErrorMessage] = useState(false);
  const [airTempErrorMessage, setAirTempErrorMessage] = useState(false);
  const [waterTempErrorMessage, setWaterTempErrorMessage] = useState(false);
  const [windSpeedErrorMessage, setWindSpeedErrorMessage] = useState(false);
  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState(false);

  function handleTimeInput(currentTime) {
    const isValid = handleTimeInputValidation(currentTime);
    isValid ? setTimeErrorMessage("") : setTimeErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  function handleFishInput(currentFish) {
    const isValid = handleFishInputValidation(currentFish);
    isValid ? setFishErrorMessage("") : setFishErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

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

  function handleLongitudeInput(currentLongitude) {
    const isValid = handleLongitudeInputValidation(currentLongitude);
    isValid
      ? setLongitudeErrorMessage("")
      : setLongitudeErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  function handleWeatherInput(currentWeather) {
    const isValid = handleWeatherInputValidation(currentWeather);
    isValid ? setWeatherErrorMessage("") : setWeatherErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  function handleAirTempInput(currentAirTemp) {
    const isValid = handleAirTempInputValidation(currentAirTemp);
    isValid ? setAirTempErrorMessage("") : setAirTempErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  function handleWaterTempInput(currentWaterTemp) {
    const isValid = handleWaterTempInputValidation(currentWaterTemp);
    isValid
      ? setWaterTempErrorMessage("")
      : setWaterTempErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  function handleWindSpeedInput(currentWindSpeed) {
    const isValid = handleWindSpeedInputValidation(currentWindSpeed);
    isValid
      ? setWindSpeedErrorMessage("")
      : setWindSpeedErrorMessage("Invalid");
    sanitizeTempCatch();
    clearFormSubmissionErrorMessage();
  }

  function clearFormSubmissionErrorMessage() {
    if (handleCatchInputValidation(tempCatch)) {
      setFormSubmissionErrorMessage("");
    }
  }

  function sanitizeTempCatch() {
    for (const key in tempCatch) {
      if (typeof tempCatch[key] == "string") {
        tempCatch[key] = tempCatch[key].trim().replace(/\s+/g, " ");
      }
    }
  }

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

function preventDigitAndSpecialCharacters(e) {
  // Letters & spaces only
  if (!/[a-zA-Z ]/.test(e.key)) {
    e.preventDefault();
  }
}

function preventDecimalAndPlusAndMinus(e) {
  if (e.key === "." || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
}

function preventDecimalAndPlus(e) {
  if (e.key === "." || e.key == "+") {
    e.preventDefault();
  }
}

function preventPlus(e) {
  if (e.key === "+") {
    e.preventDefault();
  }
}

export default EditCatchModal;
