import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLoginInputValidation } from "../../../lib/utilities/InputValidation";
import Logo from "../shared/AuthLogo.jsx";
import Form from "./shared/LoginForm.jsx";
import ErrorMessage from "./shared/LoginError.jsx";
import LoginButton from "../shared/AuthButton.jsx";
import LinkToSignup from "./shared/LoginLink.jsx";

function Login({ setUser, baseURL }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const navigate = useNavigate();

  function validateUsernameInput(currentUsername) {
    const isValid = handleLoginInputValidation(currentUsername);
    setIsUsernameValid(isValid);
    if (isValid && isPasswordValid) {
      setInputErrorMessage("");
    }
  }

  function validatePasswordInput(currentPassword) {
    const isValid = handleLoginInputValidation(currentPassword);
    setIsPasswordValid(isValid);
    if (isValid && isUsernameValid) {
      setInputErrorMessage("");
    }
  }

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

  function handleDashboardEntry() {
    navigate("/dashboard");
  }

  function handleSignupEntry() {
    navigate("/signup");
  }

  return (
    <div className="p-4 flex h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-slate-800">
      <div className="p-8 rounded-sm bg-gradient-to-b from-slate-600 to-slate-700 shadow-md shadow-slate-900">
        <Logo />
        <Form
          setUsername={setUsername}
          validateUsernameInput={validateUsernameInput}
          setPassword={setPassword}
          validatePasswordInput={validatePasswordInput}
        />
        <ErrorMessage errorMessage={inputErrorMessage} />
        <LoginButton handleAuth={handleLogin} authText={"Log in"} />
        <LinkToSignup handleSignupEntry={handleSignupEntry} />
      </div>
    </div>
  );
}

export default Login;
