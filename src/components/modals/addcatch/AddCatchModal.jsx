import { useState, useEffect, useContext } from "react";
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
import Form from "./shared/AddCatchForm.jsx";
import ErrorMessage from "../../shared/SubmissionErrorMessage.jsx";
import Button from "../shared/ModalButton.jsx";
import { BaseURLContext } from "../../../lib/context/Context.jsx";
import { AuthContext } from "../../../lib/context/Context.jsx";

function AddCatchModal({
  openAddCatchModal,
  setOpenAddCatchModal,
  trip,
  setCatches,
}) {
  if (!openAddCatchModal) return null;

  const baseURL = useContext(BaseURLContext);
  const { user, setUser } = useContext(AuthContext);

  const [newCatch, setNewCatch] = useState({ weather: "clear" });

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
    if (handleCatchInputValidation(newCatch)) {
      setFormSubmissionErrorMessage("");
    }
  }

  function sanitizeTempCatch() {
    for (const key in newCatch) {
      if (typeof newCatch[key] == "string") {
        newCatch[key] = newCatch[key].trim().replace(/\s+/g, " ");
      }
    }
  }

  function handleAddCatchClick() {
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

  function handleCancelClick() {
    setOpenAddCatchModal(false);
    setNewCatch({ weather: "clear" });
  }

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

  return (
    <div className="px-10 py-4 bg-slate-50 rounded-md font-paragraph md:-translate-x-32 shadow-md shadow-slate-950">
      <h2 className="pb-4 font-title text-xl font-semibold sm:text-2xl">
        Add a Catch
      </h2>
      <Form
        newCatch={newCatch}
        setNewCatch={setNewCatch}
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
        <Button buttonText={"Add"} handleClick={handleAddCatchClick} />
        <Button buttonText={"Cancel"} handleClick={handleCancelClick} />
      </div>
    </div>
  );
}

export default AddCatchModal;
