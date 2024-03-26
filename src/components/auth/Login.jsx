/* 
Login.jsx is the primary component for the Login page. It handles & delegates input validation and handles the POST request to the server.

@version 1.0
@since 2024-03-18
*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { handleLoginInputValidation } from "../../lib/utilities/InputValidation";

/* 
Login handles state related to user login, imports input validation from a local file, POSTs user data to the server and handles entry into the dashboard upon successful login.

@param setUser Sets the user state when credentials are authenticated by server.
@param baseURL The base URL of the POST request sent to server.
@return HTML rendering the Login page.
*/
function Login({ setUser, baseURL }) {
  // username & password state that is changed by user in input field.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // states that track successful / unsuccessful user input validation
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // state that displays error message with invalid input
  const [inputErrorMessage, setInputErrorMessage] = useState("");

  // function that changes pages without browser refresh
  const navigate = useNavigate();

  /* 
  handleUsernameInput is an data validation function that determines if the user's input is valid. If both username & password are valid,
  then the inputErrorMessage is cleared.

  @param currentUsername The username entered by the user in the input field.
  */
  function handleUsernameInput(currentUsername) {
    const isValid = handleLoginInputValidation(currentUsername);
    setIsUsernameValid(isValid);
    if (isValid && isPasswordValid) {
      setInputErrorMessage("");
    }
  }

  /* 
  handlePasswordInput is an data validation function that determines if the user's input is valid. If both username & password are valid,
  then the inputErrorMessage is cleared.

  @param currentPassword The password entered by the user in the input field.
  */
  function handlePasswordInput(currentPassword) {
    const isValid = handleLoginInputValidation(currentPassword);
    setIsPasswordValid(isValid);
    if (isValid && isUsernameValid) {
      setInputErrorMessage("");
    }
  }

  /* 
  handleLogin validates the username & password input by the user. If the data is valid, then the function prepares the data & makes a call to postExistingUser.
  If the data is invalid, then the inputErrorMessage state is changed.
  */
  function handleLogin() {
    if (isUsernameValid && isPasswordValid) {
      const existingUser = {
        username: username,
        password: password,
      };
      postExistingUser(existingUser);
    } else {
      setInputErrorMessage("One or more fields are blank");
    }
  }

  /* 
  postExistingUser is an asynchronous function that makes a POST request to the server. If successful, the server returns an object with the user id, username, & authToken.
  The user state & authToken are saved for use across the system.

  @param existingUser An object formatted from individual states with the properties: username & password.
  */
  async function postExistingUser(existingUser) {
    const POST_EXISTING_USER = `${baseURL}/auth/authenticate`;

    try {
      const response = await fetch(POST_EXISTING_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingUser),
      });

      if (!response.ok) {
        setInputErrorMessage("Login credentials are invalid");
      }

      const data = await response.json();
      const token = data.token;
      const id = data.id;
      const username = data.username;
      const user = {
        id: id,
        username: username,
      };

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser({
        id: id,
        username: username,
      });

      if (data.token) {
        handleDashboardEntry();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* 
  handleDashboardEntry navigates the user to the dashboard.
  */
  function handleDashboardEntry() {
    navigate("/dashboard");
  }

  /* 
  handleSignupEntry navigates the user to the signup page.
  */
  function handleSignupEntry() {
    navigate("/signup");
  }

  /* Tailwind Class Styles */
  const pageStyles =
    "p-4 flex h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-slate-800";
  const cardStyles =
    "p-8 rounded-sm bg-gradient-to-b from-slate-600 to-slate-700 shadow-md shadow-slate-900";
  const logoContainerStyles =
    "pb-4 flex gap-x-2 items-center font-cursive text-slate-300";
  const logoImageStyles = "size-10 md:size-11 lg:size-13";
  const logoNameStyles = "text-3xl md:text-4xl lg:text-5xl";
  const formStyles = "";
  const inputContainerStyles = "pb-2 flex flex-col";
  const inputStyles =
    "px-2 py-1 border border-0 border-zinc-400 rounded-sm bg-slate-700 hover:bg-slate-600 focus:bg-slate-200 focus:text-slate-800 shadow-md shadow-slate-800 outline-none";
  const buttonContainerStyles = "py-2 flex flex-col";
  const buttonStyles =
    "py-2 border-0 rounded-sm text-slate-800 bg-slate-300 hover:bg-slate-100 shadow-lg shadow-slate-800";
  const signupLinkContainerStyles = "pt-2 text-center";
  const signupLinkStyles =
    "pl-1 underline text-slate-300 cursor-pointer hover:text-slate-100";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <div className={cardStyles}>
        <div className={logoContainerStyles}>
          <img
            className={logoImageStyles}
            src={Logo}
            alt="Logo of a largemouth bass jumping out of the water"
          />
          <h2 className={logoNameStyles}>Fishing App</h2>
        </div>
        <form className={formStyles}>
          <label htmlFor="">Username:</label>
          <div className={inputContainerStyles}>
            <input
              className={inputStyles}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              onBlur={(e) => handleUsernameInput(e.target.value)}
            />
          </div>
          <label htmlFor="">Password:</label>
          <div className={inputContainerStyles}>
            <input
              className={inputStyles}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => handlePasswordInput(e.target.value)}
            />
          </div>
        </form>
        <p
          className={`py-2 text-red-600 text-center ${
            inputErrorMessage.length > 0 ? "visible" : "invisible"
          }`}
        >
          {inputErrorMessage}
          {"."}
        </p>
        <div className={buttonContainerStyles}>
          <button
            className={buttonStyles}
            onClick={() => {
              handleLogin();
            }}
          >
            Log in
          </button>
        </div>
        <p className={signupLinkContainerStyles}>
          Need to create an
          <a
            className={signupLinkStyles}
            onClick={() => {
              handleSignupEntry();
            }}
          >
            account
          </a>
          ?
        </p>
      </div>
    </div>
  );
}

export default Login;
