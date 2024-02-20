import { useState } from "react";
import { handleCatchInputValidation } from "../../lib/utilities/InputValidation";

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

  const [errorMessage, setErrorMessage] = useState([]);

  function handlesNewCatch() {
    const tempErrorMessage = getErrorMessage();
    if (!tempErrorMessage || tempErrorMessage.length === 0) {
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
      setErrorMessage(tempErrorMessage);
    }
  }

  async function postNewCatch(newCatchData) {
    const POST_CATCH = "http://localhost:8080/catches";
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
      sortCatches(newCatch);
      setTempCatch({});
      setErrorMessage([]);
    } catch (error) {
      console.log(error);
    }
  }

  function getErrorMessage() {
    return handleCatchInputValidation(tempCatch);
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
    "w-full h-screen fixed flex justify-center items-center bg-transparent-shadow z-50";
  const modalCardStyles = "-translate-x-32 bg-white rounded-md font-paragraph";
  const formContainerStyles = "px-20 py-8";
  const formTitleStyles = "mb-4 font-title text-3xl font-semibold";
  const formStyles = "grid grid-cols-2 gap-x-4";
  const inputContainerStyles = "flex justify-between";
  const labelStyles = "mr-2";
  const inputStyles =
    "mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm";
  const buttonContainerStyles = "flex justify-center items-center gap-4";
  const buttonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700";
  /* End Tailwind Class Styles */

  return (
    <div className={modalContainerStyles}>
      <div className={modalCardStyles}>
        <div className={formContainerStyles}>
          <h2 className={formTitleStyles}>Add a Catch</h2>
          <form className={formStyles} action="">
            <div className={inputContainerStyles}>
              <label className={labelStyles} htmlFor="">
                Time:
              </label>
              <input
                className={inputStyles}
                type="time"
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

export default AddCatchModal;
