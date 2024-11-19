import { useState, useContext } from "react";
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
} from "../../../lib/utilities/InputValidation";
import Form from "./shared/EditCatchForm.jsx";
import ErrorMessage from "../shared/ModalErrorMessage.jsx";
import Button from "../shared/ModalButton.jsx";
import { BaseURLContext } from "../../../lib/context/Context.jsx";
import { AuthContext } from "../../../lib/context/Context.jsx";

function EditCatchModal({
  openEditCatchModal,
  setOpenEditCatchModal,
  trip,
  tempCatch,
  setTempCatch,
  setCatches,
}) {
  if (!openEditCatchModal) return null;

  const baseURL = useContext(BaseURLContext);
  const { user, setUser } = useContext(AuthContext);

  const [timeErrorMessage, setTimeErrorMessage] = useState("");
  const [fishErrorMessage, setFishErrorMessage] = useState("");
  const [baitErrorMessage, setBaitErrorMessage] = useState("");
  const [latitudeErrorMessage, setLatitudeErrorMessage] = useState("");
  const [longitudeErrorMessage, setLongitudeErrorMessage] = useState("");
  const [weatherErrorMessage, setWeatherErrorMessage] = useState("");
  const [airTempErrorMessage, setAirTempErrorMessage] = useState("");
  const [waterTempErrorMessage, setWaterTempErrorMessage] = useState("");
  const [windSpeedErrorMessage, setWindSpeedErrorMessage] = useState("");

  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState("");

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

  /* 
  The function processes the catch object & prepares it for a PUT request to the server.
  */
  function handleEditClick() {
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

  function handleCancelClick() {
    setOpenEditCatchModal(false);
    setTempCatch({});
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

  return (
    <div className="px-10 py-4 bg-slate-50 rounded-md font-paragraph md:-translate-x-32 shadow-md shadow-slate-950">
      <h2 className="mb-4 font-title text-xl font-semibold sm:text-2xl">
        Edit a Catch
      </h2>
      <Form
        tempCatch={tempCatch}
        setTempCatch={setTempCatch}
        timeErrorMessage={timeErrorMessage}
        fishErrorMessage={fishErrorMessage}
        baitErrorMessage={baitErrorMessage}
        latitudeErrorMessage={latitudeErrorMessage}
        longitudeErrorMessage={longitudeErrorMessage}
        weatherErrorMessage={weatherErrorMessage}
        airTempErrorMessage={airTempErrorMessage}
        waterTempErrorMessage={waterTempErrorMessage}
        windSpeedErrorMessage={windSpeedErrorMessage}
        handleTimeInput={handleTimeInput}
        handleFishInput={handleFishInput}
        handleBaitInput={handleBaitInput}
        handleLatitudeInput={handleLatitudeInput}
        handleLongitudeInput={handleLongitudeInput}
        handleWeatherInput={handleWeatherInput}
        handleAirTempInput={handleAirTempInput}
        handleWaterTempInput={handleWaterTempInput}
        handleWindSpeedInput={handleWindSpeedInput}
      />
      <div className="my-2">
        <ErrorMessage errorMessage={formSubmissionErrorMessage} />
      </div>
      <div className="flex justify-center items-center gap-x-4">
        <Button buttonText={"Edit"} handleClick={handleEditClick} />
        <Button buttonText={"Cancel"} handleClick={handleCancelClick} />
      </div>
    </div>
  );
}

export default EditCatchModal;
