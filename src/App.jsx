import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/dashboard/shared/Layout";
import Home from "./components/dashboard/views/Home";
import ManageTrips from "./components/dashboard/views/ManageTrips";
import LandingPage from "./components/landing/LandingPage";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

const PrivateView = ({ user, children }) => {
  return user.id ? children : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateView user={user}>
                <Layout setUser={setUser} />
              </PrivateView>
            }
          >
            <Route index element={<Home user={user} />} />
            <Route path="manage-trips" element={<ManageTrips user={user} />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
