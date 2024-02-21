import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSignup() {
    const newUser = {
      username: username,
      password: password,
      email: email,
    };
    postNewUser(newUser);
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
    "p-4 flex bg-signup-image bg-center bg-cover h-screen justify-center items-center font-paragraph font-normal";
  const cardContainerStyles =
    "flex flex-col bg-transparent-shadow rounded-xl sm:flex-row";
  const contentContainerStyles =
    "flex flex-col justify-between text-white sm:w-full sm:justify-start md:max-w-[550px]";
  const logoContainerStyles =
    "pt-4 px-4 flex items-center font-cursive font-bold";
  const logoImageStyles = "size-12 md:size-14";
  const logoNameStyles = "text-5xl md:text-6xl lg:text-7xl";
  const descriptionContainerStyles = "p-4";
  const descriptionTitleStyles =
    " text-xl font-title font-bold md:text-2xl lg:text-3xl";
  const descriptionParagraphStyles = "text-md lg:text-lg";
  const formContainerStyles = "p-4 bg-white rounded-xl sm:w-full";
  const formStyles = "flex flex-col";
  const inputStyles =
    "mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-xl";
  const errorMessageStyles = "pb-2 text-center";
  const buttonContainerStyles = "flex mb-4 justify-center";
  const buttonStyles =
    "px-6 py-4 bg-blue-700 text-white border-0 rounded-xl hover:bg-blue-600";
  const loginLinkContainerStyles = "text-center";
  const loginLinkStyles = "pl-1 underline text-zinc-800 hover:text-blue-600";
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
            <h2 className={descriptionTitleStyles}>
              Lorem ipsum dolor sit amet.
            </h2>
            <p className={descriptionParagraphStyles}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ad
              nobis consectetur autem. Voluptate quo rerum praesentium tempora.
              Maiores corrupti aliquam blanditiis iste numquam harum.
            </p>
          </div>
        </div>
        <div className={formContainerStyles}>
          <form className={formStyles}>
            <label htmlFor="">Username:</label>
            <input
              className={inputStyles}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="">Email:</label>
            <input
              className={inputStyles}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="">Password:</label>
            <input
              className={inputStyles}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="">Confirm Password:</label>
            <input className={inputStyles} type="password" />
          </form>
          <p className={errorMessageStyles}>Error message</p>
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
            <a className={loginLinkStyles} href="./login">
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
