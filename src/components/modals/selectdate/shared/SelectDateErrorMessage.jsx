function SelectDateErrorMessage({ errorMessage }) {
  return (
    <p
      className={`pb-2 text-red-600 text-center ${
        errorMessage.length > 0 ? "visible" : "hidden"
      }`}
    >
      {errorMessage}
      {"."}
    </p>
  );
}

export default SelectDateErrorMessage;
