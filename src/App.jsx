import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Home from "./views/Home";
import ManageTrips from "./views/ManageTrips";
import LandingPage from "./views/LandingPage";
import Signup from "./views/Signup";
import Login from "./views/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/manage-trips" element={<ManageTrips />} />
          </Route>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
