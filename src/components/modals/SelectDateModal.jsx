import { useState } from "react";

function SelectDateModal({
  openSelectDateModal,
  setOpenSelectDateModal,
  trips,
  setTrips,
  setTrip,
  tripDate,
  user,
}) {
  if (!openSelectDateModal) return null;

  const [postTripData, setPostTripData] = useState({});
  const [tempTrip, setTempTrip] = useState({});
  const [location, setLocation] = useState();

  function handleSelectTrip(dataKey) {
    const selectedTrip = trips[dataKey];
    const updatedTripObject = {
      id: selectedTrip.tripId,
      location: selectedTrip.bodyOfWater,
      date: selectedTrip.date,
    };
    setTrip(updatedTripObject);
  }

  function handleAddTrip() {
    const newTrip = {
      date: tripDate,
      bodyOfWater: location,
      user: { id: user.id },
    };

    postNewTrip(newTrip);

    if (newTrip) {
      setOpenSelectDateModal(false);
    }
  }

  async function postNewTrip(newTripData) {
    const POST_TRIP = "http://localhost:8080/trips";
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(POST_TRIP, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTripData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.error}`);
      }

      const result = await response.json();
      console.log(result);
      const newTrip = {
        id: result.tripId,
        location: result.bodyOfWater,
        date: result.date,
        user: { id: result.id },
      };
      setTrip(newTrip);
      setTrips([...trips, newTrip]);
      console.log(newTrip);
    } catch (error) {
      console.log(error);
    }
  }

  /* Tailwind Class Styles */
  const modalContainerStyles =
    "w-full h-screen fixed flex justify-center items-center bg-transparent-shadow text-slate-800 z-50";
  const modalCardStyles =
    "m-4 p-4 bg-slate-50 rounded-sm font-paragraph md:-translate-x-32 shadow-md shadow-slate-950";
  const userActionContainerStyles = " ";
  const addTripContainerStyles =
    "mb-4 px-2 border border-0 border-b-4 border-slate-700 md:text-lg";
  const tripTitleStyles = "mb-4 font-title text-xl font-semibold sm:text-2xl";
  const userActionSubContainerStyles = "mb-4 flex justify-between items-end";
  const inputStyles =
    "mr-2 py-1 bg-slate-50 border border-solid border-slate-400 rounded-sm focus:bg-slate-200 focus:text-slate-900 shadow-sm shadow-slate-600 outline-none";
  const buttonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm shadow-md shadow-slate-600 hover:bg-slate-700";
  const existingTripContainerStyles = "pb-4";
  const existingTripSubContainerStyles =
    "mb-2 flex justify-between items-center p-2 border border-slate-700 text-sm rounded-sm";
  const existingTripTitleStyles = "font-title text-lg font-semibold sm:text-xl";
  const buttonContainerStyles = "flex justify-center items-center";
  /* End Tailwind Class Styles */

  return (
    <div className={modalContainerStyles}>
      <div className={modalCardStyles}>
        <div className={userActionContainerStyles}>
          <div className={addTripContainerStyles}>
            <h2 className={tripTitleStyles}>Add a Trip</h2>
            <div className={userActionSubContainerStyles}>
              <div>
                <label className="mr-2" htmlFor="">
                  Location:
                </label>
                <input
                  className={inputStyles}
                  type="text"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </div>
              <div>
                <button
                  className={buttonStyles}
                  onClick={() => {
                    handleAddTrip();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className={existingTripContainerStyles}>
            <h2 className={tripTitleStyles}>Or Select an Existing Trip</h2>
            {trips.map((trip, i) => (
              <div className={existingTripSubContainerStyles} key={trip.id}>
                <div>
                  <h2 className={existingTripTitleStyles}>
                    {trip.bodyOfWater}
                  </h2>
                  <p>{trip.date}</p>
                </div>
                <div>
                  <button
                    className={buttonStyles}
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
          <div className={buttonContainerStyles}>
            <button
              className={buttonStyles}
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
