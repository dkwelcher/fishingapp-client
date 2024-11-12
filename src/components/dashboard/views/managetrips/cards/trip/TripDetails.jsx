function TripDetails({ trip }) {
  function handleDateFormat(date) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  }

  return (
    <div className="w-full flex flex-col items-start text-white">
      {trip.location && (
        <h2 className="font-title font-semibold text-xl sm:text-2xl md:text-3xl xl:text-5xl">
          {trip.location}
        </h2>
      )}
      {trip.date && (
        <h2 className="font-title text-md md:text-lg xl:text-2xl">
          {handleDateFormat(trip.date)}
        </h2>
      )}
    </div>
  );
}

export default TripDetails;
