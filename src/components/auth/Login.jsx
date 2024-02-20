import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    const existingUser = {
      username: username,
      password: password,
    };
    postExistingUser(existingUser);
  }

  async function postExistingUser(existingUser) {
    const POST_EXISTING_USER = "http://localhost:8080/auth/authenticate";

    try {
      const response = await fetch(POST_EXISTING_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.error}`);
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

  /* Tailwind Class Styles */
  const pageStyles =
    "flex bg-login-image bg-center bg-cover h-screen justify-center items-center font-paragraph font-normal";
  const cardStyles = "p-12 bg-white rounded-xl";
  const logoContainerStyles =
    "flex pb-10 items-center font-cursive font-bold text-slate-900";
  const logoImageStyles = "size-14";
  const logoNameStyles = "text-5xl";
  const formStyles = "flex flex-col";
  const inputStyles =
    "mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-xl";
  const errorMessageStyles = "mb-4 text-center invisible";
  const buttonContainerStyles = "flex mb-4 justify-center";
  const buttonStyles =
    "px-6 py-4 bg-blue-700 text-white border-0 rounded-xl hover:bg-blue-600";
  const signupLinkContainerStyles = "text-center";
  const signupLinkStyles = "pl-1 underline text-zinc-800 hover:text-blue-600";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <div className={cardStyles}>
        <div className={logoContainerStyles}>
          <img
            className={logoImageStyles}
            src={Logo}
            alt="Man fishing in a row boat"
          />
          <h2 className={logoNameStyles}>Fishing App</h2>
        </div>
        <form className={formStyles}>
          <label htmlFor="">Username:</label>
          <input
            className={inputStyles}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">Password:</label>
          <input
            className={inputStyles}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <p className={errorMessageStyles}>Error message</p>
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
          <a className={signupLinkStyles} href="./signup">
            account
          </a>
          ?
        </p>
      </div>
    </div>
  );
}

export default Login;
