function FeedbackForm({
  userInput,
  setUserInput,
  selectPage,
  setSelectPage,
  formSubmissionErrorMessage,
  handleClearSubmissionConfirmation,
  handleFeedback,
}) {
  return (
    <>
      <form htmlFor="feedback" className="w-full min-h-[180px]">
        <div className="flex flex-col gap-y-1">
          <p>Please select which part of the app:</p>
          <select
            id="select-page"
            className="px-2 py-1 bg-slate-50 text-slate-800 border border-solid border-slate-400 rounded-sm shadow-sm shadow-slate-600 focus:bg-slate-200 focus:text-slate-900 outline-none"
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
          id="feedback"
          className="w-full min-h-[180px] mt-1 p-1 text-slate-800 shadow-sm shadow-slate-600 rounded-sm"
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
      <div className="py-2 flex flex-col">
        <button
          className="py-2 border-0 rounded-sm text-slate-800 bg-slate-300 hover:bg-slate-100 shadow-lg shadow-slate-800"
          onClick={() => {
            handleFeedback();
          }}
        >
          Submit Feedback
        </button>
      </div>
    </>
  );
}

export default FeedbackForm;
