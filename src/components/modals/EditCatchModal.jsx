import { useState } from "react";
import { handleCatchInputValidation } from "../../lib/utilities/InputValidation";

function EditCatchModal({
  openEditCatchModal,
  setOpenEditCatchModal,
  user,
  trip,
  tempCatch,
  setTempCatch,
  setCatches,
}) {
  if (!openEditCatchModal) return null;

  const [errorMessage, setErrorMessage] = useState([]);

  function handleCatches() {
    const tempErrorMessage = getErrorMessage();
    if (!tempErrorMessage || tempErrorMessage.length === 0) {
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
      setErrorMessage(tempErrorMessage);
    }
  }

  async function editCatch(updatedCatchData) {
    const EDIT_CATCH_BY_ID = `http://localhost:8080/catches/${tempCatch.id}`;
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
        time: result.time,
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
      setErrorMessage([]);
    } catch (error) {
      console.log(error);
    }
  }

  function getErrorMessage() {
    return handleCatchInputValidation(tempCatch);
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
    "px-10 py-4 bg-slate-50 rounded-md font-paragraph md:-translate-x-32";
  const formContainerStyles = "";
  const formTitleStyles = "mb-4 font-title text-xl font-semibold sm:text-2xl";
  const formStyles = "sm:grid sm:grid-cols-2 gap-x-4";
  const inputContainerStyles = "flex flex-col";
  const labelStyles = "pt-1 sm:text-lg";
  const inputStyles =
    "px-2 py-1 bg-slate-50 focus:bg-white border border-solid border-slate-400 rounded-sm";
  const buttonContainerStyles = "flex justify-center items-center gap-x-4";
  const buttonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700";
  /* End Tailwind Class Styles */

  return (
    <div className={modalContainerStyles}>
      <div className={modalCardStyles}>
        <div className={formContainerStyles}>
          <h2 className={formTitleStyles}>Edit a Catch</h2>
          <form className={formStyles} action="">
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Time:
              </label>
              <input
                className={inputStyles}
                type="time"
                value={tempCatch.time}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, time: e.target.value })
                }
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Fish:
              </label>
              <input
                className={inputStyles}
                type="text"
                value={tempCatch.fish}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, fish: e.target.value })
                }
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Bait:
              </label>
              <input
                className={inputStyles}
                type="text"
                value={tempCatch.bait}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, bait: e.target.value })
                }
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Latitude:
              </label>
              <input
                className={inputStyles}
                type="number"
                value={tempCatch.latitude}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, latitude: e.target.value })
                }
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Longitude:
              </label>
              <input
                className={inputStyles}
                type="number"
                value={tempCatch.longitude}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, longitude: e.target.value })
                }
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Weather:
              </label>
              <input
                className={inputStyles}
                type="text"
                value={tempCatch.weather}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, weather: e.target.value })
                }
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Air Temp:
              </label>
              <input
                className={inputStyles}
                type="number"
                value={tempCatch.airTemp}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, airTemp: e.target.value })
                }
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Water Temp:
              </label>
              <input
                className={inputStyles}
                type="number"
                value={tempCatch.waterTemp}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, waterTemp: e.target.value })
                }
              />
            </div>
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Wind Speed:
              </label>
              <input
                className={inputStyles}
                type="number"
                value={tempCatch.windSpeed}
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, windSpeed: e.target.value })
                }
              />
            </div>
          </form>
          <div
            className={`py-4 grid ${
              errorMessage.length >= 3
                ? "grid-cols-3"
                : errorMessage.length == 2
                ? "grid-cols-2"
                : "grid-cols-1"
            } gap-y-0.5 text-center text-red-500 font-bold`}
          >
            {errorMessage.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
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
                setErrorMessage([]);
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

export default EditCatchModal;
