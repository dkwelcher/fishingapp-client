import SelectBox from "./FeedbackSelectBox";
import SubmissionErrorMessage from "../../../../shared/SubmissionErrorMessage.jsx";

function FeedbackForm({
  userInput,
  setUserInput,
  selectPage,
  setSelectPage,
  formSubmissionErrorMessage,
  handleResetNotifications,
  handleFeedback,
}) {
  const optionValues = [
    "landing-page",
    "signup-page",
    "login-page",
    "home-page",
    "manage-trips-page",
    "other",
  ];

  return (
    <>
      <form htmlFor="feedback" className="w-full min-h-[180px]">
        <p className="mb-1">Please select which part of the app:</p>
        <SelectBox
          elementId={"select-page"}
          elementValue={selectPage}
          handleOnChange={setSelectPage}
          optionValuesArray={optionValues}
        />
        <textarea
          className="w-full min-h-[180px] mt-1 p-1 text-slate-800 shadow-sm shadow-slate-600 rounded-sm"
          id="feedback"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          onBlur={() => handleResetNotifications()}
        ></textarea>
      </form>
      <div className="my-2">
        <SubmissionErrorMessage errorMessage={formSubmissionErrorMessage} />
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
