import SearchBar from "../shared/SearchBar";

function Home({ user }) {
  /* Tailwind Class Styles */
  const pageStyles =
    "flex justify-center items-center h-screen  bg-home-image bg-cover bg-center";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <SearchBar />
    </div>
  );
}

export default Home;
