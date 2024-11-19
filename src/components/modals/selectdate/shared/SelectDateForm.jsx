function SelectDateForm({ setLocation, handleLocationInput }) {
  function preventDigitAndSpecialCharacters(e) {
    // Letters & spaces only
    if (!/[a-zA-Z ]/.test(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <form>
      <label className="mr-2" htmlFor="add-trip">
        Location:
      </label>
      <input
        id="add-trip"
        className="mr-2 p-1 bg-slate-50 border border-solid border-slate-400 rounded-sm focus:bg-slate-200 focus:text-slate-900 shadow-sm shadow-slate-600 outline-none"
        type="text"
        onKeyDown={(e) => preventDigitAndSpecialCharacters(e)}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        onBlur={(e) => handleLocationInput(e.target.value)}
      />
    </form>
  );
}

export default SelectDateForm;
