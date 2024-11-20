function SubmissionErrorMessage({ errorMessage }) {
  return (
    <p
      className={`text-red-600 text-center ${
        errorMessage.length > 0 ? "visible" : "invisible"
      }`}
    >
      {errorMessage}
      {"."}
    </p>
  );
}

export default SubmissionErrorMessage;
