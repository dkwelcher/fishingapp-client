/* 
InputValidation.jsx is a utility module that holds all functions related to input validation for
trips, catches, user signup, & user login.

@since 2024-03-15
*/

/* Main Catch Input Validation function */
export function handleCatchInputValidation(catchItem) {
  return (
    handleTimeInputValidation(catchItem.time) &&
    handleFishInputValidation(catchItem.fish) &&
    handleBaitInputValidation(catchItem.bait) &&
    handleLatitudeInputValidation(catchItem.latitude) &&
    handleLongitudeInputValidation(catchItem.longitude) &&
    handleWeatherInputValidation(catchItem.weather) &&
    handleAirTempInputValidation(catchItem.airTemp) &&
    handleWaterTempInputValidation(catchItem.waterTemp) &&
    handleWindSpeedInputValidation(catchItem.windSpeed)
  );
}

/* Main Trip Input Validation Function */
export function handleTripInputValidation(trip) {
  return (
    handleLocationInputValidation(trip.location) &&
    handleDateInputValidation(trip.date)
  );
}

/* Helper Catch Input Validation Functions */
export function handleTimeInputValidation(timeString) {
  if (timeString === null || timeString === undefined) {
    return false;
  }

  if (timeString === "") {
    return false;
  }

  if (!/^\d{1,2}:\d{2}$/.test(timeString)) {
    return false;
  }

  const [hours, minutes] = timeString.split(":").map(Number);

  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export function handleFishInputValidation(fishString) {
  if (fishString === null || fishString === undefined) {
    return false;
  }

  if (fishString === "") {
    return false;
  }

  // Regex: letters & spaces only
  return /^[a-zA-Z ]*$/.test(fishString) && fishString.length <= 50;
}

export function handleBaitInputValidation(baitString) {
  if (baitString === null || baitString === undefined) {
    return false;
  }

  if (baitString === "") {
    return false;
  }

  // Regex: letters & spaces only
  return /^[a-zA-Z ]*$/.test(baitString) && baitString.length <= 50;
}

export function handleLatitudeInputValidation(latitudeString) {
  if (latitudeString === null || latitudeString === undefined) {
    return false;
  }

  if (latitudeString === "") {
    return false;
  }

  const latitudeNumber = Number(latitudeString);

  // Regex: numbers, decimal, & negative sign only
  return (
    /^-?\d*(\.\d+)?$/.test(latitudeString) &&
    latitudeNumber >= -90.0 &&
    latitudeNumber <= 90.0
  );
}

export function handleLongitudeInputValidation(longitudeString) {
  if (longitudeString === null || longitudeString === undefined) {
    return false;
  }

  if (longitudeString === "") {
    return false;
  }

  const longitudeNumber = Number(longitudeString);

  // Regex: numbers, decimal, & negative sign only
  return (
    /^-?\d*(\.\d+)?$/.test(longitudeString) &&
    longitudeNumber >= -180.0 &&
    longitudeNumber <= 180.0
  );
}

export function handleWeatherInputValidation(weatherString) {
  if (weatherString === null || weatherString === undefined) {
    return false;
  }

  if (weatherString === "") {
    return false;
  }

  // Regex: letters & spaces only
  return /^[a-zA-Z ]*$/.test(weatherString) && weatherString.length <= 25;
}

export function handleAirTempInputValidation(airTempString) {
  if (airTempString === null || airTempString === undefined) {
    return false;
  }

  if (airTempString === "") {
    return false;
  }

  // Numbers & negative sign only
  if (!/^-?\d+$/.test(airTempString)) {
    return false;
  }

  const airTempNumber = Number(airTempString);

  return airTempNumber >= -50 && airTempNumber <= 150;
}

export function handleWaterTempInputValidation(waterTempString) {
  if (waterTempString === null || waterTempString === undefined) {
    return false;
  }

  if (waterTempString === "") {
    return false;
  }

  // Numbers & negative sign only
  if (!/^-?\d+$/.test(waterTempString)) {
    return false;
  }

  const waterTempNumber = Number(waterTempString);

  return waterTempNumber >= -50 && waterTempNumber <= 150;
}

export function handleWindSpeedInputValidation(windSpeedString) {
  if (windSpeedString === null || windSpeedString === undefined) {
    return false;
  }

  if (windSpeedString === "") {
    return false;
  }

  // Numbers only
  if (!/^\d+$/.test(windSpeedString)) {
    return false;
  }

  const windSpeedNumber = Number(windSpeedString);

  return windSpeedNumber >= 0 && windSpeedNumber <= 100;
}

/* Helper Trip Input Functions */
export function handleLocationInputValidation(location) {
  if (location === null || location === undefined) {
    return false;
  }

  if (location === "") {
    return false;
  }

  return /^[a-zA-Z ]*$/.test(location) && location.length <= 50;
}

export function handleDateInputValidation(date) {
  if (date === null || date === undefined) {
    return false;
  }

  if (date === "") {
    return false;
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(date)) {
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return false;
  }

  if (year < 0 || year > 3000) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return false;
  }

  return true;
}

/* Signup User Input Validation */
export function handleUsernameInputValidation(username) {
  if (username === null || username === undefined) {
    return false;
  }

  if (username.trim() === "") {
    return false;
  }

  if (username.length > 50) {
    return false;
  }

  // No special characters, no spaces.
  const validUsernameRegex = /^[A-Za-z0-9]+$/;

  return validUsernameRegex.test(username);
}

export function handleEmailInputValidation(email) {
  if (email === null || email === undefined) {
    return false;
  }

  if (email.trim() === "") {
    return false;
  }

  if (email.length > 100) {
    return false;
  }

  // Basic email validation. Does not cover all edge cases.
  const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return validEmailRegex.test(email);
}

export function handlePasswordInputValidation(password) {
  if (password === null || password === undefined) {
    return false;
  }

  if (password.trim() === "") {
    return false;
  }

  const minLength = 6;
  const maxLength = 64;

  if (password.length < minLength || password.length > maxLength) {
    return false;
  }

  // Must have at least one letter, one digit, and one special character
  const validPasswordRegex = new RegExp(
    `^(?=.*[A-Za-z])(?=.*\\d)(?=.*[-!@#$%&*()_+=|<>?{}\\[\\]~]).{${minLength},${maxLength}}$`
  );

  return validPasswordRegex.test(password);
}

export function handleConfirmPasswordInputValidation(
  password,
  confirmPassword
) {
  if (
    password === null ||
    password === undefined ||
    confirmPassword === null ||
    confirmPassword === undefined
  ) {
    return false;
  }

  if (password.trim() === "" || confirmPassword.trim() === "") {
    return false;
  }

  return password === confirmPassword;
}

/* Login User Input Validation */
export function handleLoginInputValidation(input) {
  if (input === null || input === undefined) {
    return false;
  }

  return input.trim() !== "";
}
