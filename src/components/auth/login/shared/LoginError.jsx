function LoginError({ errorMessage }) {
  return (
    <p
      className={`py-2 text-red-600 text-center ${
        errorMessage.length > 0 ? "visible" : "invisible"
      }`}
    >
      {errorMessage}
      {"."}
    </p>
  );
}

export default LoginError;
