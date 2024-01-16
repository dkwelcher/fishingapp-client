import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Home from "./views/Home";
import ViewTrip from "./views/ViewTrip";
import AddTrip from "./views/AddTrip";
import EditTrip from "./views/EditTrip";
import DeleteTrip from "./views/DeleteTrip";
import LandingPage from "./views/LandingPage";
import Signup from "./views/Signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/view-trip" element={<ViewTrip />} />
            <Route path="/add-trip" element={<AddTrip />} />
            <Route path="/edit-trip" element={<EditTrip />} />
            <Route path="/delete-trip" element={<DeleteTrip />} />
          </Route>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
