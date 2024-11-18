function LastSixMonthsButton({ setTripDate, setTrip }) {
  function handleLastSixMonthsClick() {
    setTripDate();
    setTrip({});
  }
  return (
    <button
      className="px-4 py-1 bg-slate-50 text-slate-800 rounded-sm shadow-md shadow-slate-950 text-sm sm:text-base"
      onClick={() => handleLastSixMonthsClick()}
    >
      Show Last Six Months
    </button>
  );
}

export default LastSixMonthsButton;
