import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleUsernameInputValidation,
  handleEmailInputValidation,
  handlePasswordInputValidation,
  handleConfirmPasswordInputValidation,
} from "../../../lib/utilities/InputValidation";
import { REGISTER_USER_POST_REQUEST } from "../../../lib/http/PostRequests.jsx";
import Logo from "../shared/AuthLogo.jsx";
import SignupText from "./shared/SignupText.jsx";
import SignupForm from "./shared/SignupForm.jsx";
import SubmissionErrorMessage from "../../shared/SubmissionErrorMessage.jsx";
import SignupButton from "../shared/AuthButton.jsx";
import LinkToLogin from "./shared/SignupLink.jsx";

function Signup() {
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

  function handleUsernameInput(usernameInput) {
    const isValid = handleUsernameInputValidation(usernameInput);
    setIsUsernameValid(isValid);
    displayErrorMessage(isValid, setUsernameErrorMessage, "Invalid username");
  }

  function handleEmailInput(emailInput) {
    const isValid = handleEmailInputValidation(emailInput);
    setIsEmailValid(isValid);
    displayErrorMessage(isValid, setEmailErrorMessage, "Invalid email");
  }

  function handlePasswordInput(passwordInput) {
    const isValid = handlePasswordInputValidation(passwordInput);
    setIsPasswordValid(isValid);
    displayErrorMessage(isValid, setPasswordErrorMessage, "Invalid password");

    handleConfirmPasswordInput(confirmPassword);
  }

  function handleConfirmPasswordInput(confirmPasswordInput) {
    const isValid = handleConfirmPasswordInputValidation(
      password,
      confirmPasswordInput
    );
    setIsConfirmPasswordValid(isValid);
    displayErrorMessage(
      isValid,
      setConfirmPasswordErrorMessage,
      "Passwords do not match"
    );
  }

  function displayErrorMessage(isValid, setErrorMessage, errorMessageText) {
    isValid ? setErrorMessage("") : setErrorMessage(errorMessageText);
  }

  useEffect(() => {
    if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      setFormSubmissionErrorMessage("");
    }
  }, [isUsernameValid, isEmailValid, isPasswordValid, isConfirmPasswordValid]);

  function handleSignup() {
    if (
      !isUsernameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      setFormSubmissionErrorMessage("One or more input fields are invalid");
      return;
    }

    const newUser = {
      username: username,
      password: password,
      email: email,
    };
    postNewUser(newUser);
  }

  async function postNewUser(newUser) {
    try {
      const response = await fetch(REGISTER_USER_POST_REQUEST, {
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
        navigateToLogin();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function navigateToLogin() {
    navigate("/login");
  }

  return (
    <div className="p-4 flex h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-slate-800">
      <div className="p-8 max-w-[500px] rounded-sm bg-gradient-to-b from-slate-600 to-slate-700 shadow-md shadow-slate-900">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="pb-8">
          <SignupText />
        </div>
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
        <div className="my-2">
          <SubmissionErrorMessage errorMessage={formSubmissionErrorMessage} />
        </div>
        <div className="mb-2 py-2 flex flex-col">
          <SignupButton
            handleAuth={handleSignup}
            authText="Create your account"
          />
        </div>
        <LinkToLogin handleNavigation={navigateToLogin} />
      </div>
    </div>
  );
}

export default Signup;
