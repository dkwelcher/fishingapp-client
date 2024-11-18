function SignupForm({
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleUsernameInput,
  handleEmailInput,
  handlePasswordInput,
  handleConfirmPasswordInput,
  usernameErrorMessage,
  emailErrorMessage,
  passwordErrorMessage,
  confirmPasswordErrorMessage,
  confirmPassword,
}) {
  const inputContainerStyles = "pb-2 flex flex-col";
  const inputStyles =
    "px-2 py-1 border border-0 border-zinc-400 rounded-sm bg-slate-700 hover:bg-slate-600 focus:bg-slate-200 focus:text-slate-800 shadow-md shadow-slate-800 outline-none";
  const inputErrorMessageStyles = "text-red-600";

  return (
    <form>
      <div className={inputContainerStyles}>
        <label htmlFor="username">
          Username:{" "}
          {
            <span className={inputErrorMessageStyles}>
              {usernameErrorMessage}
            </span>
          }
        </label>
        <input
          id="username"
          className={inputStyles}
          type="text"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={(e) => handleUsernameInput(e.target.value)}
        />
      </div>
      <div className={inputContainerStyles}>
        <label htmlFor="email">
          Email:{" "}
          {<span className={inputErrorMessageStyles}>{emailErrorMessage}</span>}
        </label>
        <input
          id="email"
          className={inputStyles}
          type="email"
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => handleEmailInput(e.target.value)}
        />
      </div>
      <div className={inputContainerStyles}>
        <label htmlFor="password">
          Password:{" "}
          {
            <span className={inputErrorMessageStyles}>
              {passwordErrorMessage}
            </span>
          }
        </label>
        <input
          id="password"
          className={inputStyles}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => {
            handlePasswordInput(e.target.value);
            handleConfirmPasswordInput(confirmPassword);
          }}
        />
      </div>
      <div className={inputContainerStyles}>
        <label htmlFor="confirmPassword">
          Confirm Password:{" "}
          {
            <span className={inputErrorMessageStyles}>
              {confirmPasswordErrorMessage}
            </span>
          }
        </label>
        <input
          id="confirmPassword"
          className={inputStyles}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={(e) => handleConfirmPasswordInput(e.target.value)}
        />
      </div>
    </form>
  );
}

export default SignupForm;
