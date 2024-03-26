/* 
SearchBar.jsx is an intermediate component that displays an input field.

@since 2024-02-22
*/

import { HiOutlineSearch } from "react-icons/hi";

/* 
SearchBar renders a container with an input field intended for searching the dashboard

@return HTML that renders a container with an input field.
*/
function SearchBar() {
  /* Tailwind Class Styles */
  const searchBarContainerStyles = "relative";
  const searchBarIconStyles =
    "text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 size-5";
  const searchBarInputStyles =
    "text-sm focus:outline-none active:outline-none h-10 w-[18rem] border border-gray-300 rounded-sm pl-11 pr-4 md:w-[24rem]";
  /* End Tailwind Class Styles */

  return (
    <div className={searchBarContainerStyles}>
      <HiOutlineSearch className={searchBarIconStyles} />
      <input
        className={searchBarInputStyles}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
