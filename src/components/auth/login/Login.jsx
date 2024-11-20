import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { handleLoginInputValidation } from "../../../lib/utilities/InputValidation";
import { AUTHENTICATE_USER_POST_REQUEST } from "../../../lib/http/PostRequests.jsx";
import Logo from "../shared/AuthLogo.jsx";
import Form from "./shared/LoginForm.jsx";
import ErrorMessage from "./shared/LoginError.jsx";
import LoginButton from "../shared/AuthButton.jsx";
import LinkToSignup from "./shared/LoginLink.jsx";
import { AuthContext } from "../../../lib/context/Context.jsx";

function Login() {
  const { user, setUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const navigate = useNavigate();

  function validateUsernameInput(usernameInput) {
    setIsUsernameValid(handleLoginInputValidation(usernameInput));
  }

  function validatePasswordInput(passwordInput) {
    setIsPasswordValid(handleLoginInputValidation(passwordInput));
  }

  function handleLoginClick() {
    if (!isUsernameValid || !isPasswordValid) {
      setInputErrorMessage("One or more fields are blank");
      return;
    }

    const existingUser = {
      username: username,
      password: password,
    };
    postExistingUser(existingUser);
  }

  useEffect(() => {
    if (isUsernameValid && isPasswordValid) {
      setInputErrorMessage("");
    }
  }, [isUsernameValid, isPasswordValid]);

  async function postExistingUser(existingUser) {
    try {
      const response = await fetch(AUTHENTICATE_USER_POST_REQUEST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingUser),
      });

      if (!response.ok) {
        setInputErrorMessage("Login credentials are invalid");
        return;
      }

      const data = await response.json();

      localStorage.setItem("authToken", data.token);

      setUser({
        id: data.id,
        username: data.username,
      });

      if (data.token) {
        navigateToDashboard();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function navigateToDashboard() {
    navigate("/dashboard");
  }

  function navigateToSignup() {
    navigate("/signup");
  }

  return (
    <div className="p-4 flex h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-slate-800">
      <div className="p-8 rounded-sm bg-gradient-to-b from-slate-600 to-slate-700 shadow-md shadow-slate-900">
        <div className="mb-4">
          <Logo />
        </div>
        <Form
          setUsername={setUsername}
          validateUsernameInput={validateUsernameInput}
          setPassword={setPassword}
          validatePasswordInput={validatePasswordInput}
        />
        <ErrorMessage errorMessage={inputErrorMessage} />
        <div className="mb-2 py-2 flex flex-col">
          <LoginButton handleAuth={handleLoginClick} authText={"Log in"} />
        </div>
        <LinkToSignup handleNavigation={navigateToSignup} />
      </div>
    </div>
  );
}

export default Login;
