import { useState } from "react";
import { AuthContext } from "./auth-context";

const SESSION_KEY = "culinaryToken";
const USER_KEY = "culinaryCurrentUser";
const API_BASE = "http://localhost:5000/api/auth";

function getInitialUser() {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getInitialUser);
  const [loading] = useState(false);

  async function signup({ name, email, countryCode, phone, password }) {
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, countryCode, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Signup failed." };
      }

      localStorage.setItem(SESSION_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setCurrentUser(data.user);

      return { success: true };
    } catch (err) {
      console.error("Signup error:", err);
      return { success: false, message: "Could not connect to server." };
    }
  }

  async function login({ identifier, password }) {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Login failed." };
      }

      localStorage.setItem(SESSION_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setCurrentUser(data.user);

      return { success: true, isNewUser: !data.user.infoCompleted };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Could not connect to server." };
    }
  }

  async function completeUserInfo(profileData) {
    try {
      const res = await fetch(`${API_BASE}/complete-info`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          profile: profileData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.error("Complete-info error:", err);
    }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
    setCurrentUser(null);
  }

  // Forgot/reset password: not yet implemented on backend.
  // Keeping these as stubs so ForgotPassword.jsx / ResetPassword.jsx don't crash.
  function requestPasswordReset() {
    return {
      success: false,
      message: "Password reset isn't available yet. Please contact support.",
    };
  }

  function resetPassword() {
    return {
      success: false,
      message: "Password reset isn't available yet. Please contact support.",
    };
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        signup,
        login,
        logout,
        completeUserInfo,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}