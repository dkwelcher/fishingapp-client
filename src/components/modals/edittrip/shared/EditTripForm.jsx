import DatePicker from "react-datepicker";

function EditTripForm({
  tempTrip,
  setTempTrip,
  editDate,
  setEditDate,
  locationErrorMessage,
  dateErrorMessage,
  handleLocationInput,
  handleDateInput,
}) {
  function preventDigitAndSpecialCharacters(e) {
    // Letters & spaces only
    if (!/[a-zA-Z ]/.test(e.key)) {
      e.preventDefault();
    }
  }

  /* TAILWIND STYLES */
  const inputStyles =
    "mb-4 px-2 py-1 bg-slate-50 border border-solid border-slate-400 rounded-sm shadow-sm shadow-slate-600  focus:bg-slate-200 focus:text-slate-900 outline-none";
  const inputErrorMessageStyles = "text-red-600";
  /* END TAILWIND STYLES */

  return (
    <form>
      <div className="flex flex-col md:text-lg">
        <label htmlFor="trip-location">
          Location:{" "}
          {
            <span className={inputErrorMessageStyles}>
              {locationErrorMessage}
            </span>
          }
        </label>
        <input
          id="trip-location"
          className={inputStyles}
          type="text"
          value={tempTrip.location}
          onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
          onChange={(e) =>
            setTempTrip({ ...tempTrip, location: e.target.value })
          }
          onBlur={(e) => handleLocationInput(e.target.value)}
        />
        <label htmlFor="trip-date">
          Date:{" "}
          {<span className={inputErrorMessageStyles}>{dateErrorMessage}</span>}
        </label>
        <div>
          <DatePicker
            id="trip-date"
            className={inputStyles}
            showIcon
            selected={editDate}
            onChange={(date) => setEditDate(date)}
            onBlur={(e) => handleDateInput(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}

export default EditTripForm;
