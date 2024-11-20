import Input from "../../shared/AuthInput.jsx";
import ErrorSpan from "../../shared/AuthInputErrorSpan.jsx";

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
}) {
  return (
    <form className="flex flex-col gap-y-2">
      <div>
        <label htmlFor="username">
          Username: {<ErrorSpan errorMessage={usernameErrorMessage} />}
        </label>
        <Input
          inputId={"username"}
          inputType={"text"}
          isAutoCompleteOn={false}
          handleOnChange={setUsername}
          handleOnBlur={handleUsernameInput}
        />
      </div>
      <div>
        <label htmlFor="email">
          Email: {<ErrorSpan errorMessage={emailErrorMessage} />}
        </label>
        <Input
          inputId={"email"}
          inputType={"email"}
          isAutoCompleteOn={true}
          handleOnChange={setEmail}
          handleOnBlur={handleEmailInput}
        />
      </div>
      <div>
        <label htmlFor="password">
          Password: {<ErrorSpan errorMessage={passwordErrorMessage} />}
        </label>
        <Input
          inputId={"password"}
          inputType={"password"}
          isAutoCompleteOn={false}
          handleOnChange={setPassword}
          handleOnBlur={handlePasswordInput}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">
          Confirm Password:{" "}
          {<ErrorSpan errorMessage={confirmPasswordErrorMessage} />}
        </label>
        <Input
          inputId={"confirmPassword"}
          inputType={"password"}
          isAutoCompleteOn={false}
          handleOnChange={setConfirmPassword}
          handleOnBlur={handleConfirmPasswordInput}
        />
      </div>
    </form>
  );
}

export default SignupForm;
