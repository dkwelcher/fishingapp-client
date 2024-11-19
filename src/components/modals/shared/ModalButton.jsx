function ModalButton({ buttonText, index, handleClick }) {
  return (
    <button
      className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm shadow-md shadow-slate-600 hover:bg-slate-700"
      data-key={index}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {buttonText}
    </button>
  );
}

export default ModalButton;
