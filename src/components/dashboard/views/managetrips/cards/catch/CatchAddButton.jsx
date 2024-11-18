function CatchAddButton({ handleClick }) {
  return (
    <div className="pb-2 flex flex-col items-center">
      <button
        className="w-[300px] bg-slate-300 text-slate-600 px-6 py-2 rounded-sm font-bold shadow-md shadow-slate-900 hover:bg-slate-100 hover:text-slate-500"
        onClick={() => handleClick()}
      >
        Add a New Catch
      </button>
    </div>
  );
}

export default CatchAddButton;
