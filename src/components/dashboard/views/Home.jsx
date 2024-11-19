import { useContext } from "react";
import SearchBar from "../shared/SearchBar";
import { AuthContext } from "../../../lib/context/Context";

function Home() {
  const { user, setUser } = useContext(AuthContext);
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-screen bg-home-image bg-cover bg-center">
      <h1 className="fixed top-2 right-2 text-2xl">{user.username}</h1>
      {<SearchBar />}
    </div>
  );
}

export default Home;
