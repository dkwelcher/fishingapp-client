/* 
App.jsx establishes the Router, Routes, Route pattern with react-router-dom and is the component from which all components are derived.

@version 1.0
@since 2024-03-19
*/

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/dashboard/shared/Layout";
import Home from "./components/dashboard/views/Home";
import ManageTrips from "./components/dashboard/views/ManageTrips";
import Feedback from "./components/dashboard/views/Feedback";
import LandingPage from "./components/landing/LandingPage";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

/* 
PrivateView is an inner component that restricts the user to the login page when no user exists.

This prevents an unauthorized user from manually accessing pages that require authorization.

@param user The user set after successful login.
@param children The components contained within the PrivateView component.
@return If user.id exists, then return children components; otherwise, return Navigate component pointing to login page.
*/
const PrivateView = ({ user, children }) => {
  return user.id ? children : <Navigate to="/login" replace />;
};

/* 
App establishes the Router, Routes, Route pattern from react-router-dom which structures the flow of the application. Each Route contains a path property and element property. 
The path property sets the path for the Route. The element property sets the component for the Route.

App also manages user, baseURL, and screenWidth state used across multiple components.

@return HTML pointing to primary components and passing properties to those components.
*/
function App() {
  // user state that checks for a user object in localStorage. If it exists, then parse to user state; otherwise, user state is an empty object.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  // baseURL is imported from .env with syntax specific to Vite's specifications.
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // screenWidth is the width of the user's device. It's used for dynamic elements such as the landing page menu & the dashboard sidebar.
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  /* 
  The useEffect handles brower window resize events.

  @return Cleanup function that removes the event listener from window on component unmount.
  */
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup baseURL={baseURL} />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} baseURL={baseURL} />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateView user={user}>
                <Layout setUser={setUser} screenWidth={screenWidth} />
              </PrivateView>
            }
          >
            <Route index element={<Home user={user} />} />
            <Route
              path="manage-trips"
              element={
                <ManageTrips
                  user={user}
                  screenWidth={screenWidth}
                  baseURL={baseURL}
                />
              }
            />
            <Route
              path="feedback"
              element={<Feedback user={user} baseURL={baseURL} />}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
