function LoginLink({ handleSignupEntry }) {
  return (
    <p className="pt-2 text-center">
      Need to create an
      <a
        className="pl-1 underline text-slate-300 cursor-pointer hover:text-slate-100"
        onClick={() => {
          handleSignupEntry();
        }}
      >
        account
      </a>
      ?
    </p>
  );
}

export default LoginLink;
