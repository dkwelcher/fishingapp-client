function AddCatchForm({
  newCatch,
  setNewCatch,
  timeErrorMessage,
  fishErrorMessage,
  baitErrorMessage,
  latitudeErrorMessage,
  longitudeErrorMessage,
  weatherErrorMessage,
  airTempErrorMessage,
  waterTempErrorMessage,
  windSpeedErrorMessage,
  handleTimeInput,
  handleFishInput,
  handleBaitInput,
  handleLatitudeInput,
  handleLongitudeInput,
  handleWeatherInput,
  handleAirTempInput,
  handleWaterTempInput,
  handleWindSpeedInput,
}) {
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
  /* TAILWIND STYLES */
  const inputContainerStyles = "flex flex-col";
  const labelStyles = "pt-1 sm:text-lg";
  const inputStyles =
    "px-2 py-1 bg-slate-50 border border-solid border-slate-400 rounded-sm shadow-sm shadow-slate-600 focus:bg-slate-200 focus:text-slate-900 outline-none";
  const inputErrorMessageStyles = "text-red-600";
  /* END TAILWIND STYLES */

  return (
    <form className="sm:grid sm:grid-cols-2 gap-x-4">
      <div className={inputContainerStyles}>
        <label className={labelStyles} htmlFor="catch-time">
          Time:{" "}
          {<span className={inputErrorMessageStyles}>{timeErrorMessage}</span>}
        </label>
        <input
          id="catch-time"
          className={inputStyles}
          type="time"
          value={newCatch.time ?? ""}
          onChange={(e) => setNewCatch({ ...newCatch, time: e.target.value })}
          onBlur={(e) => handleTimeInput(e.target.value)}
        />
      </div>
      <div className={inputContainerStyles}>
        <label className={labelStyles} htmlFor="catch-fish">
          Fish:{" "}
          {<span className={inputErrorMessageStyles}>{fishErrorMessage}</span>}
        </label>
        <input
          id="catch-fish"
          className={inputStyles}
          type="text"
          onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
          onChange={(e) => setNewCatch({ ...newCatch, fish: e.target.value })}
          onBlur={(e) => handleFishInput(e.target.value)}
        />
      </div>
      <div className={inputContainerStyles}>
        <label className={labelStyles} htmlFor="catch-bait">
          Bait / Lure:{" "}
          {<span className={inputErrorMessageStyles}>{baitErrorMessage}</span>}
        </label>
        <input
          id="catch-bait"
          className={inputStyles}
          type="text"
          onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
          onChange={(e) => setNewCatch({ ...newCatch, bait: e.target.value })}
          onBlur={(e) => handleBaitInput(e.target.value)}
        />
      </div>
      <div className={inputContainerStyles}>
        <label className={labelStyles} htmlFor="catch-weather">
          Weather:{" "}
          {
            <span className={inputErrorMessageStyles}>
              {weatherErrorMessage}
            </span>
          }
        </label>
        <select
          id="catch-weather"
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
          <option value="moderate precipitation">moderate precipitation</option>
          <option value="heavy precipitation">heavy precipitation</option>
        </select>
      </div>
      <div className={inputContainerStyles}>
        <label className={labelStyles} htmlFor="catch-latitude">
          Latitude:{" "}
          {
            <span className={inputErrorMessageStyles}>
              {latitudeErrorMessage}
            </span>
          }
        </label>
        <input
          id="catch-latitude"
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
        <label className={labelStyles} htmlFor="catch-longitude">
          Longitude:{" "}
          {
            <span className={inputErrorMessageStyles}>
              {longitudeErrorMessage}
            </span>
          }
        </label>
        <input
          id="catch-longitude"
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
        <label className={labelStyles} htmlFor="catch-airtemp">
          Air Temp (&deg;F):{" "}
          {
            <span className={inputErrorMessageStyles}>
              {airTempErrorMessage}
            </span>
          }
        </label>
        <input
          id="catch-airtemp"
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
        <label className={labelStyles} htmlFor="catch-watertemp">
          Water Temp (&deg;F):{" "}
          {
            <span className={inputErrorMessageStyles}>
              {waterTempErrorMessage}
            </span>
          }
        </label>
        <input
          id="catch-watertemp"
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
        <label className={labelStyles} htmlFor="catch-windspeed">
          Wind Speed (MPH):{" "}
          {
            <span className={inputErrorMessageStyles}>
              {windSpeedErrorMessage}
            </span>
          }
        </label>
        <input
          id="catch-windspeed"
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
  );
}

export default AddCatchForm;
