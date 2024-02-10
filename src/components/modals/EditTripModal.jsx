import { useState } from "react";
import { handleTripInputValidation } from "../../lib/utilities/InputValidation";
import DatePicker from "react-datepicker";

function EditTripModal({
  openEditTripModal,
  setOpenEditTripModal,
  trip,
  setTrip,
  trips,
  setTrips,
  tempTrip,
  setTempTrip,
  setTripInfo,
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
      setTripInfo(); // triggers useEffect for fetching trips in ManageTrips component
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

  return (
    <div className="w-full h-screen fixed flex justify-center items-center bg-transparent-shadow z-50">
      <div className="-translate-x-32 bg-white rounded-md font-paragraph">
        <div className="px-20 py-8">
          <h2 className="mb-4 font-title text-3xl font-semibold">
            Edit Current Trip
          </h2>
          <form action="">
            <div className="flex flex-col">
              <label htmlFor="">Location:</label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
                value={tempTrip.location}
                onChange={(e) =>
                  setTempTrip({ ...tempTrip, location: e.target.value })
                }
              />
              <label htmlFor="">Date</label>
              <div className="relative">
                <DatePicker
                  className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
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
          <div className="flex justify-center items-center gap-4">
            <button
              className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700"
              onClick={() => {
                handleEditTrip();
              }}
            >
              Edit
            </button>
            <button
              className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700"
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
