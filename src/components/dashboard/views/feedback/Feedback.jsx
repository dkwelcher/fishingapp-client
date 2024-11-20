import { useState, useContext } from "react";
import { FEEDBACK_POST_REQUEST } from "../../../../lib/http/PostRequests.jsx";
import Content from "./shared/FeedbackContent.jsx";
import Form from "./shared/FeedbackForm.jsx";
import { AuthContext } from "../../../../lib/context/Context.jsx";

function Feedback() {
  const { user, setUser } = useContext(AuthContext);

  const [feedback, setFeedback] = useState("");
  const [selectPage, setSelectPage] = useState("Landing page");
  const [isSuccessfulSubmission, setIsSuccessfulSubmission] = useState(false);
  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState("");

  function handleFeedback() {
    if (!feedback) {
      setFormSubmissionErrorMessage("Feedback cannot be empty");
      return;
    }

    const MAX_LENGTH_SUBMISSION = 1000;
    if (feedback.length > MAX_LENGTH_SUBMISSION) {
      setFormSubmissionErrorMessage(
        `Feedback cannot exceed ${MAX_LENGTH_SUBMISSION} characters`
      );
      return;
    }

    const formattedFeedback = formatFeedback();
    setFeedback(formattedFeedback);
    postFeedback(formattedFeedback);
  }

  function formatFeedback() {
    const currentDate = new Date();
    return `user=${
      user.id
    } feedbackOn=${selectPage} (${currentDate}): ${feedback.trim()}`;
  }

  async function postFeedback(formattedFeedback) {
    try {
      const response = await fetch(FEEDBACK_POST_REQUEST(user.id), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedFeedback),
      });

      if (!response.ok) {
        setFormSubmissionErrorMessage("Something went wrong");
        throw new Error(`HTTP error: ${response.error}`);
      }

      resetForm();
      setIsSuccessfulSubmission(true);
    } catch (error) {
      console.log(error);
    }
  }

  function resetForm() {
    setFeedback("");
    setSelectPage("landing page");
    setFormSubmissionErrorMessage("");
  }

  function handleResetNotifications() {
    setIsSuccessfulSubmission(false);
    setFormSubmissionErrorMessage("");
  }

  return (
    <div className="p-4 flex flex-col h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-feedback-image-mobile lg:bg-feedback-image-desktop bg-cover bg-center">
      <p className="absolute bottom-1 right-1 text-xs 2xl:text-sm">
        Image credit: Dr. Hala Strohmier Berry
      </p>
      <div
        className={`max-w-[500px] w-full lg:mb-2 py-1 bg-transparent-shadow-feedback-success rounded-sm ${
          isSuccessfulSubmission ? "visible" : "invisible"
        }`}
      >
        <p className="font-title font-semibold text-lg text-center text-slate-800">
          Thank you for submitting
        </p>
      </div>
      <div className="p-8 max-w-[500px] rounded-sm bg-transparent-shadow-darker lg:bg-transparent-shadow shadow-md shadow-slate-900">
        <Content />
        <Form
          userInput={feedback}
          setUserInput={setFeedback}
          selectPage={selectPage}
          setSelectPage={setSelectPage}
          formSubmissionErrorMessage={formSubmissionErrorMessage}
          handleResetNotifications={handleResetNotifications}
          handleFeedback={handleFeedback}
        />
      </div>
    </div>
  );
}

export default Feedback;
