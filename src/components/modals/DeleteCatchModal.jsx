function DeleteCatchModal({
  openDeleteCatchModal,
  setOpenDeleteCatchModal,
  user,
  tempCatch,
  setTempCatch,
  catches,
  setCatches,
}) {
  if (!openDeleteCatchModal) return null;

  function handleDeleteCatch() {
    deleteCatch();
  }

  async function deleteCatch() {
    const tempCatchId = tempCatch.id;
    const deleteBody = {
      date: tempCatch.date,
      bodyOfWater: tempCatch.location,
      user: {
        id: user.id,
      },
    };
    const DELETE_CATCH_BY_ID = `http://localhost:8080/catches/${tempCatchId}`;
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(DELETE_CATCH_BY_ID, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      setCatches((catches) => {
        return catches.filter((catchItem) => catchItem.id !== tempCatchId);
      });
      setTempCatch({});
    } catch (error) {
      console.log(error);
    }
  }

  function handleTimeConversionTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "pm" : "am";
    const newHours = ((hoursInt + 11) % 12) + 1;
    return `${newHours.toString().padStart(2, "0")}:${minutes} ${suffix}`;
  }

  return (
    <div className="w-full h-screen fixed flex justify-center items-center bg-transparent-shadow z-50">
      <div className="-translate-x-32 bg-white rounded-md font-paragraph">
        <div className="px-20 py-8">
          <h2 className="mb-4 font-title text-3xl font-semibold">
            Are you sure you want to delete?
          </h2>
          <div>
            <div className="grid grid-cols-2 gap-10">
              <div className="grid grid-cols-2">
                <p>Time:</p>
                <p>{handleTimeConversionTo12HourFormat(tempCatch.time)}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Fish:</p>
                <p>{tempCatch.fish}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="grid grid-cols-2">
                <p>Bait:</p>
                <p>{tempCatch.bait}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Weather:</p>
                <p>{tempCatch.weather}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="grid grid-cols-2">
                <p>Latitude:</p>
                <p>{tempCatch.latitude}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Longitude:</p>
                <p>{tempCatch.longitude}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="grid grid-cols-2">
                <p>Air Temp:</p>
                <p>{tempCatch.airTemp}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Water Temp:</p>
                <p>{tempCatch.waterTemp}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="grid grid-cols-2">
                <p>Wind Speed:</p>
                <p>{tempCatch.windSpeed}</p>
              </div>
              <div className="grid grid-cols-2"></div>
            </div>
          </div>
          <div className="flex justify-center align-items">
            <button
              className="mr-4 bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700"
              onClick={() => {
                handleDeleteCatch();
                setOpenDeleteCatchModal(false);
              }}
            >
              Yes
            </button>
            <button
              className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700"
              onClick={() => {
                setOpenDeleteCatchModal(false);
                setTempCatch({});
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteCatchModal;
