function AuthLink({ handleAuth, linkText }) {
  return (
    <a
      className="p-2 hover:no-underline text-slate-600 text-lg rounded-lg hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white lg:text-2xl"
      onClick={() => {
        handleAuth();
      }}
    >
      <p>{linkText}</p>
    </a>
  );
}

export default AuthLink;
