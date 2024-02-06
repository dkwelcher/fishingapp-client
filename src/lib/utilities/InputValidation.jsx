/* Main Catch Input Validation function */
export function handleCatchInputValidation(catchItem) {
  const errors = [];

  const isTimeInputValid = handleTimeInputValidation(catchItem.time);
  if (!isTimeInputValid) errors.push("Time is not valid");

  const isFishInputValid = handleFishInputValidation(catchItem.fish);
  if (!isFishInputValid) errors.push("Fish is not valid");

  const isBaitInputValid = handleBaitInputValidation(catchItem.bait);
  if (!isBaitInputValid) errors.push("Bait is not valid");

  const isLatitudeInputValid = handleLatitudeInputValidation(
    catchItem.latitude
  );
  if (!isLatitudeInputValid) errors.push("Latitude is not valid");

  const isLongitudeInputValid = handleLongitudeInputValidation(
    catchItem.longitude
  );
  if (!isLongitudeInputValid) errors.push("Longitude is not valid");

  const isWeatherInputValid = handleWeatherInputValidation(catchItem.weather);
  if (!isWeatherInputValid) errors.push("Weather is not valid");

  const isAirTempInputValid = handleAirTempInputValidation(catchItem.airTemp);
  if (!isAirTempInputValid) errors.push("Air Temp is not valid");

  const isWaterTempInputValid = handleWaterTempInputValidation(
    catchItem.waterTemp
  );
  if (!isWaterTempInputValid) errors.push("Water Temp is not valid");

  const isWindSpeedInputValid = handleWindSpeedInputValidation(
    catchItem.windSpeed
  );
  if (!isWindSpeedInputValid) errors.push("Wind Speed is not valid");

  return errors;
}

/* Main Trip Input Validation Function */
export function handleTripInputValidation(trip) {
  const errors = [];

  const isLocationInputValid = handleLocationInputValidation(trip.location);
  if (!isLocationInputValid) errors.push("Location is not valid");

  const isDateInputValid = handleDateInputValidation(trip.date);
  if (!isDateInputValid) errors.push("Date is not valid");

  return errors;
}

/* Helper Catch Input Validation Functions */
function handleTimeInputValidation(timeString) {
  if (timeString === null || timeString === undefined) {
    return false;
  }

  const timeStringTrimmed = timeString.trim();

  if (timeStringTrimmed === "") {
    return false;
  }

  if (!/^\d{1,2}:\d{2}$/.test(timeStringTrimmed.trim())) {
    return false;
  }

  const [hours, minutes] = timeString.split(":").map(Number);

  return hours >= 0 && hours <= 24 && minutes >= 0 && minutes <= 59;
}

function handleFishInputValidation(fishString) {
  if (fishString === null || fishString === undefined) {
    return false;
  }

  if (fishString.trim() === "") {
    return false;
  }

  return fishString.length <= 50;
}

function handleBaitInputValidation(baitString) {
  if (baitString === null || baitString === undefined) {
    return false;
  }

  if (baitString.trim() === "") {
    return false;
  }

  return baitString.length <= 50;
}

function handleLatitudeInputValidation(latitudeString) {
  if (latitudeString === null || latitudeString === undefined) {
    return false;
  }

  if (latitudeString.trim() === "") {
    return false;
  }

  const latitudeNumber = Number(latitudeString);

  return latitudeNumber >= -90.0 && latitudeNumber <= 90.0;
}

function handleLongitudeInputValidation(longitudeString) {
  if (longitudeString === null || longitudeString === undefined) {
    return false;
  }

  if (longitudeString.trim() === "") {
    return false;
  }

  const longitudeNumber = Number(longitudeString);

  return longitudeNumber >= -180.0 && longitudeNumber <= 180.0;
}

function handleWeatherInputValidation(weatherString) {
  if (weatherString === null || weatherString === undefined) {
    return false;
  }

  if (weatherString.trim() === "") {
    return false;
  }

  return weatherString.length <= 25;
}

function handleAirTempInputValidation(airTempString) {
  if (airTempString === null || airTempString === undefined) {
    return false;
  }

  if (airTempString.trim() === "") {
    return false;
  }

  const airTempNumber = Number(airTempString);

  return airTempNumber >= -50 && airTempNumber <= 150;
}

function handleWaterTempInputValidation(waterTempString) {
  if (waterTempString === null || waterTempString === undefined) {
    return false;
  }

  if (waterTempString.trim() === "") {
    return false;
  }

  const waterTempNumber = Number(waterTempString);

  return waterTempNumber >= -50 && waterTempNumber <= 150;
}

function handleWindSpeedInputValidation(windSpeedString) {
  if (windSpeedString === null || windSpeedString === undefined) {
    return false;
  }

  if (windSpeedString.trim() === "") {
    return false;
  }

  const windSpeedNumber = Number(windSpeedString);

  return windSpeedNumber >= 0 && windSpeedNumber <= 100;
}

/* Helper Trip Input Functions */
function handleLocationInputValidation(location) {
  if (location === null || location === undefined) {
    return false;
  }

  if (location.trim() === "") {
    return false;
  }

  return location.length <= 50;
}

function handleDateInputValidation(date) {
  if (date === null || date === undefined) {
    return false;
  }

  if (date.trim() === "") {
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);

  return (
    year >= 0 &&
    year <= 3000 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31
  );
}
