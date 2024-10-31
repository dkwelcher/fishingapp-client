import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleUsernameInputValidation,
  handleEmailInputValidation,
  handlePasswordInputValidation,
  handleConfirmPasswordInputValidation,
} from "../../../lib/utilities/InputValidation";
import SignupText from "./shared/SignupText.jsx";
import SignupForm from "./shared/SignupForm.jsx";
import ErrorMessage from "./shared/SignupError.jsx";
import SignupButton from "../shared/AuthButton.jsx";
import LinkToLogin from "./shared/SignupLink.jsx";

function Signup({ baseURL }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState("");

  const navigate = useNavigate();

  function handleUsernameInput(currentUsername) {
    const isValid = handleUsernameInputValidation(currentUsername);
    setIsUsernameValid(isValid);
    isValid
      ? setUsernameErrorMessage("")
      : setUsernameErrorMessage("Invalid username");
    if (isValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      setFormSubmissionErrorMessage("");
    }
  }

  function handleEmailInput(currentEmail) {
    const isValid = handleEmailInputValidation(currentEmail);
    setIsEmailValid(isValid);
    isValid ? setEmailErrorMessage("") : setEmailErrorMessage("Invalid email");
    if (
      isValid &&
      isUsernameValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      setFormSubmissionErrorMessage("");
    }
  }

  function handlePasswordInput(currentPassword) {
    const isValid = handlePasswordInputValidation(currentPassword);
    setIsPasswordValid(isValid);
    isValid
      ? setPasswordErrorMessage("")
      : setPasswordErrorMessage("Invalid Password");
    if (isValid && isUsernameValid && isEmailValid && isConfirmPasswordValid) {
      setFormSubmissionErrorMessage("");
    }
  }

  function handleConfirmPasswordInput(currentConfirmPassword) {
    const isValid = handleConfirmPasswordInputValidation(
      password,
      currentConfirmPassword
    );
    setIsConfirmPasswordValid(isValid);
    isValid
      ? setConfirmPasswordErrorMessage("")
      : setConfirmPasswordErrorMessage("Passwords do not match");
    if (isValid && isUsernameValid && isEmailValid && isPasswordValid) {
      setFormSubmissionErrorMessage("");
    }
  }

  function handleSignup() {
    if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      const newUser = {
        username: username,
        password: password,
        email: email,
      };
      postNewUser(newUser);
    } else {
      setFormSubmissionErrorMessage("One or more input fields are invalid");
    }
  }

  async function postNewUser(newUser) {
    const POST_NEW_USER = `${baseURL}/auth/register`;

    try {
      const response = await fetch(POST_NEW_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.error}`);
      }

      const data = await response.json();

      if (data.token) {
        handleNavigateToLogin();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigateToLogin() {
    navigate("/login");
  }

  return (
    <div className="p-4 flex h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-slate-800">
      <div className="p-8 max-w-[500px] rounded-sm bg-gradient-to-b from-slate-600 to-slate-700 shadow-md shadow-slate-900">
        <SignupText />
        <SignupForm
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          handleUsernameInput={handleUsernameInput}
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          handleConfirmPasswordInput={handleConfirmPasswordInput}
          usernameErrorMessage={usernameErrorMessage}
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          confirmPasswordErrorMessage={confirmPasswordErrorMessage}
          confirmPassword={confirmPassword}
        />
        <ErrorMessage errorMessage={formSubmissionErrorMessage} />
        <SignupButton
          handleAuth={handleSignup}
          authText="Create your account"
        />
        <LinkToLogin handleNavigateToLogin={handleNavigateToLogin} />
      </div>
    </div>
  );
}

export default Signup;
