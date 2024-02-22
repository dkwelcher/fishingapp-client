import { useState } from "react";
import { handleTripInputValidation } from "../../lib/utilities/InputValidation";
import DatePicker from "react-datepicker";

function EditTripModal({
  openEditTripModal,
  setOpenEditTripModal,
  trip,
  setTrip,
  setTrips,
  tempTrip,
  setTempTrip,
  setTripDate,
  user,
}) {
  if (!openEditTripModal) return null;

  const [errorMessage, setErrorMessage] = useState([]);

  function handleEditTrip() {
    const tempErrorMessage = getErrorMessage();
    if (!tempErrorMessage || tempErrorMessage.length === 0) {
      const updatedTrip = { ...tempTrip, date: handleDateFormatting(editDate) };
      editTrip(updatedTrip);
      setOpenEditTripModal(false);
    } else {
      setErrorMessage(tempErrorMessage);
    }
  }

  async function editTrip(updatedTrip) {
    const EDIT_TRIP_BY_ID = `http://localhost:8080/trips/${trip.id}`;
    const token = localStorage.getItem("authToken");

    const convertedUpdatedTrip = {
      id: trip.id,
      date: updatedTrip.date,
      bodyOfWater: updatedTrip.location,
      user: { id: user.id },
    };

    try {
      const response = await fetch(EDIT_TRIP_BY_ID, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedUpdatedTrip),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();

      const resultingTrip = {
        id: result.tripId,
        location: result.bodyOfWater,
        date: result.date,
      };

      setTrip(resultingTrip);
      setTrips((currentTrips) =>
        currentTrips.map((tripObject) =>
          tripObject.id === trip.id
            ? { ...tripObject, ...resultingTrip }
            : tripObject
        )
      );
      setTempTrip({});
      setTripDate(); // triggers useEffect for fetching trips in ManageTrips component
      setOpenEditTripModal(false);
      setErrorMessage([]);
    } catch (error) {
      console.log(error);
    }
  }

  function getErrorMessage() {
    return handleTripInputValidation(tempTrip);
  }

  const [editDate, setEditDate] = useState(new Date(handleDateConversion()));

  function handleDateConversion() {
    const date = trip.date;
    const formattedDate = date + "T00:00:00";
    return formattedDate;
  }

  function handleDateFormatting(date) {
    const year = date.getFullYear();
    // Month is zero-indexed
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  /* Tailwind Class Styles */
  const modalContainerStyles =
    "w-full h-screen fixed flex justify-center items-center bg-transparent-shadow text-slate-800 z-50";
  const modalCardStyles =
    "px-10 py-4 bg-slate-50 rounded-md font-paragraph md:-translate-x-32";
  const formContainerStyles = "";
  const formTitleStyles = "mb-4 font-title text-xl font-semibold sm:text-2xl";
  const inputContainerStyles = "flex flex-col md:text-lg";
  const datePickerContainerStyles = "";
  const inputStyles =
    "mb-4 px-2 py-1 bg-slate-50 focus:bg-white  border border-solid border-slate-400 rounded-sm";
  const buttonContainerStyles = "flex justify-center items-center gap-x-4";
  const buttonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700";
  /* End Tailwind Class Styles */

  return (
    <div className={modalContainerStyles}>
      <div className={modalCardStyles}>
        <div className={formContainerStyles}>
          <h2 className={formTitleStyles}>Edit Current Trip</h2>
          <form action="">
            <div className={inputContainerStyles}>
              <label htmlFor="">Location:</label>
              <input
                className={inputStyles}
                type="text"
                value={tempTrip.location}
                onChange={(e) =>
                  setTempTrip({ ...tempTrip, location: e.target.value })
                }
              />
              <label htmlFor="">Date</label>
              <div className={datePickerContainerStyles}>
                <DatePicker
                  className={inputStyles}
                  showIcon
                  selected={editDate}
                  onChange={(date) => setEditDate(date)}
                />
              </div>
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
                handleEditTrip();
              }}
            >
              Edit
            </button>
            <button
              className={buttonStyles}
              onClick={() => {
                setOpenEditTripModal(false);
                setTempTrip({});
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

export default EditTripModal;
