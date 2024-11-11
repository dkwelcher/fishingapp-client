import SearchBar from "../shared/SearchBar";

function Home({ user }) {
  return (
    <div className="flex justify-center items-center h-screen bg-home-image bg-cover bg-center">
      {<SearchBar />}
    </div>
  );
}

export default Home;
