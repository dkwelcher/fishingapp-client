import { useState } from "react";
import DatePicker from "react-datepicker";

function EditTripModal({
  openEditTripModal,
  setOpenEditTripModal,
  trip,
  setTrip,
  tempTrip,
  setTempTrip,
}) {
  if (!openEditTripModal) return null;

  const [editDate, setEditDate] = useState(new Date(handleDateConversion()));

  function handleDateConversion() {
    const date = trip.date;
    const formattedDate = date + "T00:00:00";
    return formattedDate;
  }

  function handleEditTrip() {
    const updatedTrip = { ...trip, date: handleDateFormatting(editDate) };
    setTrip(updatedTrip);
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
          <h2 className="mb-4 font-title text-3xl">Edit Current Trip</h2>
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
          <div className="flex justify-center items-center gap-4">
            <button
              className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm"
              onClick={() => {
                handleEditTrip();
                setOpenEditTripModal(false);
              }}
            >
              Edit
            </button>
            <button
              className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm"
              onClick={() => setOpenEditTripModal(false)}
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
