function TripDetails({ trip }) {
  function handleDateFormat(date) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  }

  return (
    <>
      {trip.location && (
        <h2 className="font-title font-semibold text-xl sm:text-2xl md:text-3xl xl:text-5xl">
          {trip.location}
        </h2>
      )}
      {trip.date && (
        <h3 className="font-title text-md md:text-lg xl:text-2xl">
          {handleDateFormat(trip.date)}
        </h3>
      )}
    </>
  );
}

export default TripDetails;
