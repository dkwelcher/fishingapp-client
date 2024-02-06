function DeleteTripModal({
  openDeleteTripModal,
  setOpenDeleteTripModal,
  trip,
  setTrip,
}) {
  if (!openDeleteTripModal) return null;

  function handleDeleteTrip() {
    setTrip({});
  }

  return (
    <div className="w-full h-screen fixed flex justify-center items-center bg-transparent-shadow z-50">
      <div className="-translate-x-32 bg-white rounded-md font-paragraph">
        <div className="px-20 py-8">
          <h2 className="mb-4 font-title text-3xl font-semibold">
            Are you sure you want to delete?
          </h2>
          <div className="mb-4">
            <p className="text-center">
              {trip.location} on {trip.date}
            </p>
          </div>
          <div className="flex justify-center align-items">
            <button
              className="mr-4 bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700"
              onClick={() => {
                handleDeleteTrip();
                setOpenDeleteTripModal(false);
              }}
            >
              Yes
            </button>
            <button
              className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700"
              onClick={() => setOpenDeleteTripModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTripModal;
