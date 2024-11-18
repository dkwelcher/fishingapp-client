function SignupLink({ handleNavigateToLogin }) {
  return (
    <p className="text-center">
      Already have an account?
      <a
        className="pl-1 underline text-slate-200 cursor-pointer hover:no-underline active:no-underline"
        onClick={() => {
          handleNavigateToLogin();
        }}
      >
        Log in here
      </a>
      .
    </p>
  );
}

export default SignupLink;
