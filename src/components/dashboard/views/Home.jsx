/* 
Home.jsx is a dashboard component that displays a background image & the SearchBar component.

@since 2024-03-18
*/

import SearchBar from "../shared/SearchBar";

/* 
Home renders a background image and a SearchBar component.

@param user An object that holds user properties.
@return HTML that renders a container with a background image & a SearchBar component.
*/
function Home({ user }) {
  /* Tailwind Class Styles */
  const pageStyles =
    "flex justify-center items-center h-screen bg-home-image bg-cover bg-center";
  /* End Tailwind Class Styles */

  return <div className={pageStyles}>{/* <SearchBar /> */}</div>;
}

export default Home;
