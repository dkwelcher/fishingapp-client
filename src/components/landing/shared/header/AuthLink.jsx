function AuthLink({ handleAuth, linkText }) {
  return (
    <a
      className="py-2 px-4 hover:no-underline text-slate-500 text-lg rounded-lg hover:bg-slate-500 hover:text-slate-200 active:bg-slate-500 active:text-slate-200 lg:text-2xl"
      onClick={() => {
        handleAuth();
      }}
    >
      <p>{linkText}</p>
    </a>
  );
}

export default AuthLink;
