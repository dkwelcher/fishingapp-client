import Input from "../../shared/AuthInput.jsx";

function LoginForm({
  setUsername,
  validateUsernameInput,
  setPassword,
  validatePasswordInput,
}) {
  return (
    <form className="flex flex-col gap-y-2">
      <div>
        <label htmlFor="username">Username:</label>
        <Input
          inputId={"username"}
          inputType={"text"}
          isAutoCompleteOn={true}
          handleOnChange={setUsername}
          handleOnBlur={validateUsernameInput}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <Input
          inputId={"password"}
          inputType={"password"}
          isAutoCompleteOn={false}
          handleOnChange={setPassword}
          handleOnBlur={validatePasswordInput}
        />
      </div>
    </form>
  );
}

export default LoginForm;
