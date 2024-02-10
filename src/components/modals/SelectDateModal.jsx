import { useState } from "react";

function SelectDateModal({
  openSelectDateModal,
  setOpenSelectDateModal,
  trips,
  setTrips,
  trip,
  setTrip,
  tripInfo,
  setTripInfo,
  getTripInfo,
}) {
  if (!openSelectDateModal) return null;

  const [tempTrip, setTempTrip] = useState({});

  function handleSelectTrip(dataKey) {
    const selectedTrip = trips[dataKey];
    const updatedTripObject = {
      id: selectedTrip.tripId,
      location: selectedTrip.bodyOfWater,
      date: selectedTrip.date,
    };
    setTrip(updatedTripObject);
  }

  return (
    <div className="w-full h-screen fixed flex justify-center items-center bg-transparent-shadow z-50">
      <div className="-translate-x-32 bg-white rounded-md font-paragraph">
        <div className="px-20 py-8">
          <div className="mb-4 px-2 border border-0 border-b-4 border-slate-700">
            <h2 className="mb-4 font-title text-3xl font-semibold">
              Add a Trip
            </h2>
            <div className="mb-4 flex justify-between items-center">
              <div>
                <label className="mr-2" htmlFor="">
                  Location:
                </label>
                <input
                  className="mr-2 py-1 border border-solid border-zinc-400 rounded-sm"
                  type="text"
                />
              </div>
              <div>
                <button className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700">
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <h2 className="mb-4 font-title text-3xl font-semibold">
              Or Select an Existing Trip
            </h2>
            {trips.map((trip, i) => (
              <div
                className="mb-2 flex justify-between items-center p-2 border border-slate-700 rounded-sm"
                key={trip.id}
              >
                <div>
                  <h2 className="font-title text-xl font-semibold">
                    {trip.bodyOfWater}
                  </h2>
                  <p>{trip.date}</p>
                </div>
                <div>
                  <button
                    className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700"
                    data-key={i}
                    onClick={(e) => {
                      const dataKey = e.currentTarget.getAttribute("data-key");
                      setOpenSelectDateModal(false);
                      handleSelectTrip(dataKey);
                    }}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <button
              className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700"
              onClick={() => {
                setOpenSelectDateModal(false);
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

export default SelectDateModal;
