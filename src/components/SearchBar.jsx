import { HiOutlineSearch } from "react-icons/hi";

function SearchBar({ to }) {
  return (
    <div className="relative">
      <HiOutlineSearch
        fontSize={20}
        className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
      />
      <input
        className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4"
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
