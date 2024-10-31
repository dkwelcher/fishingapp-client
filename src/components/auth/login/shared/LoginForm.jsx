function LoginForm({
  setUsername,
  validateUsernameInput,
  setPassword,
  validatePasswordInput,
}) {
  const inputContainerStyles = "pb-2 flex flex-col";
  const inputStyles =
    "px-2 py-1 border border-0 border-zinc-400 rounded-sm bg-slate-700 hover:bg-slate-600 focus:bg-slate-200 focus:text-slate-800 shadow-md shadow-slate-800 outline-none";

  return (
    <form>
      <label htmlFor="username">Username:</label>
      <div className={inputContainerStyles}>
        <input
          id="username"
          className={inputStyles}
          type="text"
          autoComplete="on"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={(e) => validateUsernameInput(e.target.value)}
        />
      </div>
      <label htmlFor="password">Password:</label>
      <div className={inputContainerStyles}>
        <input
          id="password"
          className={inputStyles}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => validatePasswordInput(e.target.value)}
        />
      </div>
    </form>
  );
}

export default LoginForm;
