import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import {
  handleUsernameInputValidation,
  handleEmailInputValidation,
  handlePasswordInputValidation,
  handleConfirmPasswordInputValidation,
} from "../../lib/utilities/InputValidation";

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
    const POST_NEW_USER = "http://localhost:8080/auth/register";

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

  /* Tailwind Class Styles */
  const pageStyles =
    "p-4 flex h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-slate-800";
  const cardContainerStyles =
    "p-8 max-w-[500px] rounded-sm bg-gradient-to-b from-slate-600 to-slate-700 shadow-md shadow-slate-900";
  const contentContainerStyles = "";
  const logoContainerStyles =
    "pb-4 flex gap-x-2 items-center font-cursive text-slate-300";
  const logoImageStyles = "size-10 md:size-11 lg:size-13";
  const logoNameStyles = "text-3xl md:text-4xl lg:text-5xl";
  const descriptionContainerStyles = "pb-8";
  const descriptionTitleStyles = "pb-2 font-title font-semibold text-lg";
  const descriptionParagraphStyles = "text-slate-300";
  const formContainerStyles = "";
  const formStyles = "";
  const inputContainerStyles = "pb-2 flex flex-col";
  const inputStyles =
    "px-2 py-1 border border-0 border-zinc-400 rounded-sm bg-slate-700 hover:bg-slate-600 focus:bg-slate-200 focus:text-slate-800 shadow-md shadow-slate-800 outline-none";
  const inputErrorMessageStyles = "text-red-600";
  const buttonContainerStyles = "py-2 flex flex-col";
  const buttonStyles =
    "py-2 border-0 rounded-sm text-slate-800 bg-slate-300 hover:bg-slate-100 shadow-lg shadow-slate-800";
  const loginLinkContainerStyles = "pt-2 text-center";
  const loginLinkStyles =
    "pl-1 underline text-slate-300 cursor-pointer hover:text-slate-100";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <div className={cardContainerStyles}>
        <div className={contentContainerStyles}>
          <div className={logoContainerStyles}>
            <img
              className={logoImageStyles}
              src={Logo}
              alt="Man fishing in a row boat"
            />
            <h2 className={logoNameStyles}>Fishing App</h2>
          </div>
          <div className={descriptionContainerStyles}>
            <h2 className={descriptionTitleStyles}>CREATE YOUR OWN ACCOUNT</h2>
            <p className={descriptionParagraphStyles}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ad
              nobis consectetur autem. Voluptate quo rerum praesentium tempora.
              Maiores corrupti aliquam blanditiis iste numquam harum.
            </p>
          </div>
        </div>
        <div className={formContainerStyles}>
          <form className={formStyles}>
            <div className={inputContainerStyles}>
              <label htmlFor="">
                Username:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {usernameErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                onBlur={(e) => handleUsernameInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label htmlFor="">
                Email:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {emailErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => handleEmailInput(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label htmlFor="">
                Password:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {passwordErrorMessage}
                  </span>
                }
              </label>
              <input
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
              <label htmlFor="">
                Confirm Password:{" "}
                {
                  <span className={inputErrorMessageStyles}>
                    {confirmPasswordErrorMessage}
                  </span>
                }
              </label>
              <input
                className={inputStyles}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={(e) => handleConfirmPasswordInput(e.target.value)}
              />
            </div>
          </form>
          <p
            className={`py-2 text-red-600 text-center ${
              formSubmissionErrorMessage.length > 0 ? "visible" : "invisible"
            }`}
          >
            {formSubmissionErrorMessage}
            {"."}
          </p>
          <div className={buttonContainerStyles}>
            <button
              className={buttonStyles}
              onClick={() => {
                handleSignup();
              }}
            >
              Create your account
            </button>
          </div>
          <p className={loginLinkContainerStyles}>
            Already have an
            <a
              className={loginLinkStyles}
              onClick={() => {
                handleNavigateToLogin();
              }}
            >
              account
            </a>
            ?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
