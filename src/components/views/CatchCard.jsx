function CatchCard({
  catches,
  setCatches,
  setTempCatch,
  openAddCatchModal,
  setOpenAddCatchModal,
  openEditCatchModal,
  setOpenEditCatchModal,
  openDeleteCatchModal,
  setOpenDeleteCatchModal,
}) {
  function handleEditCatch(dataKey) {
    const catchItem = catches[dataKey];
    const newCatchItem = { ...catchItem, index: dataKey };
    setTempCatch(newCatchItem);
  }

  function handleDeleteCatch(dataKey) {
    const catchItem = catches[dataKey];
    setTempCatch(catchItem);
  }

  return (
    <div>
      <div className="mb-4">
        <button
          className="bg-white text-slate-600 px-6 py-2 rounded-sm font-paragraph font-bold"
          onClick={() => setOpenAddCatchModal(true)}
        >
          Add a New Catch
        </button>
      </div>
      <div>
        {catches.map((catchItem, i) => (
          <div
            className={`flex justify-around items-center ${
              i % 2 == 0 ? "bg-slate-200" : "bg-slate-300"
            } mb-2 p-2 rounded-md`}
            key={catchItem.id}
          >
            <div className="flex">
              <div className="font-title font-medium">
                <p>Time:</p>
                <p>Species:</p>
                <p>Bait:</p>
              </div>
              <div className="ml-4 font-paragraph text-sm">
                <p>{catchItem.time}</p>
                <p>{catchItem.fish}</p>
                <p>{catchItem.bait}</p>
              </div>
            </div>
            <div className="flex">
              <div className="font-title font-medium">
                <p>Latitude:</p>
                <p>Longitude:</p>
                <p>Weather:</p>
              </div>
              <div className="ml-4 font-paragraph text-sm">
                <p>{catchItem.latitude}</p>
                <p>{catchItem.longitude}</p>
                <p>{catchItem.weather}</p>
              </div>
            </div>
            <div className="flex">
              <div className="font-title font-medium">
                <p>Air Temp:</p>
                <p>Water Temp:</p>
                <p>Wind Speed:</p>
              </div>
              <div className="ml-4 font-paragraph text-sm">
                <p>{catchItem.airTemp}</p>
                <p>{catchItem.waterTemp}</p>
                <p>{catchItem.windSpeed}</p>
              </div>
            </div>
            <div className="flex font-paragraph">
              <button
                className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm"
                data-key={i}
                onClick={(e) => {
                  const dataKey = e.currentTarget.getAttribute("data-key");
                  setOpenEditCatchModal(true);
                  handleEditCatch(dataKey);
                }}
              >
                Edit
              </button>
              <button
                className="ml-4 bg-slate-800 text-slate-200 px-6 py-2 rounded-sm"
                data-key={i}
                onClick={(e) => {
                  const dataKey = e.currentTarget.getAttribute("data-key");
                  setOpenDeleteCatchModal(true);
                  handleDeleteCatch(dataKey);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatchCard;
