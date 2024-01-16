import Logo from "../assets/logo.png";

function Signup() {
  return (
    <div className="flex bg-signup-image bg-center bg-cover h-screen justify-center items-center">
      <div className="flex pl-4 gap-20 bg-transparent-shadow rounded-2xl">
        <div className="flex flex-col justify-between w-full pl-4 py-4 max-w-[550px] text-white">
          <div className="flex pt-4 items-center font-caveat font-bold">
            <img
              className="size-14"
              src={Logo}
              alt="Man fishing in a row boat"
            />
            <h2 className="text-7xl">Fishing App</h2>
          </div>
          <div className="pb-8">
            <h2 className="pb-4 text-3xl font-rubik font-bold">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ad
              nobis consectetur autem. Voluptate quo rerum praesentium tempora.
              Maiores corrupti aliquam blanditiis iste numquam harum.
            </p>
          </div>
        </div>
        <div className="w-full max-w-[500px] p-8 font-montserrat font-normal bg-white rounded-2xl">
          <form className="flex flex-col">
            <label for="">Username:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-2xl"
              type="text"
            />
            <label for="">Email:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-2xl"
              type="email"
            />
            <label for="">Password:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-2xl"
              type="password"
            />
            <label for="">Confirm Password:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-2xl"
              type="password"
            />
          </form>
          <p className="mb-4 text-center invisible">Error message</p>
          <div className="flex mb-4 justify-center">
            <button className="px-6 py-4 bg-blue-700 text-white border-0 rounded-2xl hover:bg-blue-600">
              Create your account
            </button>
          </div>
          <p className="text-center">
            Already have an
            <a
              className="pl-1 underline text-zinc-800 hover:text-blue-600"
              href="../index.html"
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
