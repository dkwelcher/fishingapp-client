function ModalErrorMessage({ errorMessage }) {
  return (
    <p
      className={`text-red-600 text-center ${
        errorMessage.length > 0 ? "visible" : "hidden"
      }`}
    >
      {errorMessage}
      {"."}
    </p>
  );
}

export default ModalErrorMessage;
