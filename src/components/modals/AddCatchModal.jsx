function AddCatchModal({ open, set }) {
  if (!open) return null;

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
                type="text"
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Species:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Bait:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Latitude:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Longitude:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Weather:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Air Temp:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Water Temp:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
              />
            </div>
            <div className="flex justify-between">
              <label className="mr-2" htmlFor="">
                Wind Speed:
              </label>
              <input
                className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-sm"
                type="text"
              />
            </div>
          </form>
          <div className="flex justify-center items-center gap-4">
            <button className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm">
              Add
            </button>
            <button
              className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm"
              onClick={() => set(false)}
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
