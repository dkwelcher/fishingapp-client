function AddCatchModal({
  openAddCatchModal,
  setOpenAddCatchModal,
  tempCatch,
  setTempCatch,
  catches,
  setCatches,
}) {
  if (!openAddCatchModal) return null;

  function handlesNewCatch() {
    const newCatch = {
      id: null,
      fish: tempCatch.fish,
      time: tempCatch.time,
      latitude: tempCatch.latitude,
      longitude: tempCatch.longitude,
      bait: tempCatch.bait,
      weather: tempCatch.weather,
      airTemp: tempCatch.airTemp,
      waterTemp: tempCatch.waterTemp,
      windSpeed: tempCatch.windSpeed,
    };
    sortCatches(newCatch);
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

  return (
    <div className="w-full h-screen fixed flex justify-center items-center bg-transparent-shadow z-50">
      <div className="-translate-x-32 bg-white rounded-md font-paragraph">
        <div className="px-20 py-8">
          <h2 className="mb-4 font-title text-3xl">Add a Catch</h2>
          <form className="grid grid-cols-2 gap-x-4" action="">
            <div className="flex justify-between">
              <label className="text-right mr-2" htmlFor="">
                Time:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="time"
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, time: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Species:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, fish: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Bait:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, bait: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Latitude:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, latitude: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Longitude:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, longitude: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Weather:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, weather: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Air Temp:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, airTemp: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Water Temp:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, waterTemp: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Wind Speed:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
                onChange={(e) =>
                  setTempCatch({ ...tempCatch, windSpeed: e.target.value })
                }
              />
            </div>
          </form>
          <div className="flex justify-center items-center gap-4">
            <button
              className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm"
              onClick={() => {
                handlesNewCatch();
                setOpenAddCatchModal(false);
              }}
            >
              Add
            </button>
            <button
              className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm"
              onClick={() => setOpenAddCatchModal(false)}
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
