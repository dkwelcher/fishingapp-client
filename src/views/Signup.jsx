import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

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

  return (
    <div className="flex bg-signup-image bg-center bg-cover h-screen justify-center items-center">
      <div className="flex pl-4 gap-20 bg-transparent-shadow rounded-xl">
        <div className="flex flex-col justify-between w-full pl-4 py-4 max-w-[550px] text-white">
          <div className="flex pt-4 items-center font-cursive font-bold">
            <img
              className="size-14"
              src={Logo}
              alt="Man fishing in a row boat"
            />
            <h2 className="text-7xl">Fishing App</h2>
          </div>
          <div className="pb-8">
            <h2 className="pb-4 text-3xl font-title font-bold">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ad
              nobis consectetur autem. Voluptate quo rerum praesentium tempora.
              Maiores corrupti aliquam blanditiis iste numquam harum.
            </p>
          </div>
        </div>
        <div className="w-full max-w-[500px] p-8 font-paragraph font-normal bg-white rounded-xl">
          <form className="flex flex-col">
            <label for="">Username:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-xl"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label for="">Email:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-xl"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="">Password:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-xl"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="">Confirm Password:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-xl"
              type="password"
            />
          </form>
          <p className="mb-4 text-center invisible">Error message</p>
          <div className="flex mb-4 justify-center">
            <button
              className="px-6 py-4 bg-blue-700 text-white border-0 rounded-xl hover:bg-blue-600"
              onClick={() => {
                handleSignup();
              }}
            >
              Create your account
            </button>
          </div>
          <p className="text-center">
            Already have an
            <a
              className="pl-1 underline text-zinc-800 hover:text-blue-600"
              href="./login"
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
