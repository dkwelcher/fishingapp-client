import { HiOutlineSearch } from "react-icons/hi";

function SearchBar() {
  return (
    <div className="relative">
      <HiOutlineSearch className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 size-5" />
      <input
        id="search-dashboard"
        className="text-sm focus:outline-none active:outline-none h-10 w-[18rem] border border-gray-300 rounded-sm pl-11 pr-4 md:w-[24rem]"
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
