function LoginLink({ handleSignupEntry }) {
  return (
    <p className="text-center">
      Need to
      <a
        className="pl-1 underline text-slate-200 cursor-pointer hover:no-underline active:no-underline"
        onClick={() => {
          handleSignupEntry();
        }}
      >
        create an account
      </a>
      ?
    </p>
  );
}

export default LoginLink;
