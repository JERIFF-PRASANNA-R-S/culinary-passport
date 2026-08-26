import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Cuisines from "./pages/Cuisines";
import Dishes from "./pages/Dishes";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserInfo from "./pages/UserInfo";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <div className="page-transition" key={location.pathname}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cuisines"
            element={
              <ProtectedRoute>
                <Cuisines />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dishes"
            element={
              <ProtectedRoute>
                <Dishes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;