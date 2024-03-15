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

function AddCatchModal({
  openAddCatchModal,
  setOpenAddCatchModal,
  user,
  trip,
  tempCatch,
  setTempCatch,
  setCatches,
}) {
  if (!openAddCatchModal) return null;

  useEffect(() => {
    setTempCatch({ ...tempCatch, weather: "clear" });
  }, []);

  const [timeErrorMessage, setTimeErrorMessage] = useState(false);
  const [fishErrorMessage, setFishErrorMessage] = useState(false);
  const [baitErrorMessage, setBaitErrorMessage] = useState(false);
  const [latitudeErrorMessage, setLatitudeErrorMessage] = useState(false);
  const [longitudeErrorMessage, setLongitudeErrorMessage] = useState(false);
  const [weatherErrorMessage, setWeatherErrorMessage] = useState(false);
  const [airTempErrorMessage, setAirTempErrorMessage] = useState(false);
  const [waterTempErrorMessage, setWaterTempErrorMessage] = useState(false);
  const [windSpeedErrorMessage, setWindSpeedErrorMessage] = useState(false);
  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] = useState(
    []
  );

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

  function handlesNewCatch() {
    sanitizeTempCatch();
    if (handleCatchInputValidation(tempCatch)) {
      const newCatchPost = {
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
      postNewCatch(newCatchPost);

      setOpenAddCatchModal(false);
    } else {
      setFormSubmissionErrorMessage("One or more input fields are invalid");
    }
  }

  async function postNewCatch(newCatchData) {
    const POST_CATCH = `http://localhost:8080/catches?userId=${user.id}`;
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
      const newCatch = {
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
      sortCatches(newCatch);
      setTempCatch({});
    } catch (error) {
      console.log(error);
    }
  }

  function sortCatches(newCatch) {
    setCatches((currentCatches) => {
      const updatedCatches = [...currentCatches, newCatch];
      return updatedCatches.sort((a, b) => {
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
                onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, fish: e.target.value })
                }
                onBlur={(e) => handleFishInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Bait:{" "}
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
                type="text"
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, weather: e.target.value })
                }
                onBlur={(e) => handleWeatherInput(e.target.value)}
              >
                <option value="clear">clear</option>
                <option value="partially cloudy">partially cloudy</option>
                <option value="overcast">overcast</option>
                <option value="rainy">rainy</option>
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
                onKeyDown={(e) => preventPlus(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, longitude: e.target.value })
                }
                onBlur={(e) => handleLongitudeInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Air Temp:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {airTempErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="number"
                onKeyDown={(e) => preventDecimalAndPlus(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, airTemp: e.target.value })
                }
                onBlur={(e) => handleAirTempInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Water Temp:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {waterTempErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="number"
                onKeyDown={(e) => preventDecimalAndPlus(e)}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, waterTemp: e.target.value })
                }
                onBlur={(e) => handleWaterTempInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Wind Speed:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {windSpeedErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="number"
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
                handlesNewCatch();
              }}
            >
              Add
            </button>
            <button
              className={buttonStyles}
              onClick={() => {
                setOpenAddCatchModal(false);
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
  const isAtStart = e.target.value.length === 0;

  if (e.key === "." || e.key == "+") {
    e.preventDefault();
  } else if (e.key == "-" && !isAtStart) {
    e.preventDefault();
  }
}

function preventPlus(e) {
  const isAtStart = e.target.value.length === 0;

  if (e.key === "+") {
    e.preventDefault();
  } else if (e.key == "-" && !isAtStart) {
    e.preventDefault();
  }
}

export default AddCatchModal;
