function FeedbackForm({
  userInput,
  setUserInput,
  selectPage,
  setSelectPage,
  formSubmissionErrorMessage,
  handleClearSubmissionConfirmation,
  handleFeedback,
}) {
  const formContainerStyles = "w-full";
  const formStyles = "w-full min-h-[180px]";
  const inputStyles =
    "px-2 py-1 bg-slate-50 text-slate-800 border border-solid border-slate-400 rounded-sm shadow-sm shadow-slate-600 focus:bg-slate-200 focus:text-slate-900 outline-none";
  const textAreaStyles =
    "w-full min-h-[180px] mt-1 p-1 text-slate-800 shadow-sm shadow-slate-600 rounded-sm";
  const buttonContainerStyles = "py-2 flex flex-col";
  const buttonStyles =
    "py-2 border-0 rounded-sm text-slate-800 bg-slate-300 hover:bg-slate-100 shadow-lg shadow-slate-800";
  return (
    <div className={formContainerStyles}>
      <form className={formStyles}>
        <div className="flex flex-col gap-y-1">
          <p>Please select which part of the app:</p>
          <select
            className={inputStyles}
            value={selectPage}
            type="text"
            onChange={(e) => setSelectPage(e.target.value)}
          >
            <option value="landing-page">Landing page</option>
            <option value="signup-page">Signup page</option>
            <option value="login-page">Login page</option>
            <option value="home-page">Home page</option>
            <option value="manage-trips-page">Manage Trips page</option>
            <option value="other">Other</option>
          </select>
        </div>
        <textarea
          className={textAreaStyles}
          value={userInput}
          onChange={(e) => {
            handleClearSubmissionConfirmation();
            setUserInput(e.target.value);
          }}
        ></textarea>
      </form>
      <div>
        <p
          className={`py-2 text-red-600 text-center ${
            formSubmissionErrorMessage.length > 0 ? "visible" : "hidden"
          }`}
        >
          {formSubmissionErrorMessage}
          {"."}
        </p>
      </div>
      <div className={buttonContainerStyles}>
        <button
          className={buttonStyles}
          onClick={() => {
            handleFeedback();
          }}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default FeedbackForm;
