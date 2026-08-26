import { useState } from "react";
import { AuthContext } from "./auth-context";

const USERS_KEY = "culinaryUsersDB";
const SESSION_KEY = "culinaryCurrentUser";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getInitialUser() {
  const sessionEmail = localStorage.getItem(SESSION_KEY);
  if (!sessionEmail) return null;

  const users = getUsers();
  return users.find((u) => u.email === sessionEmail) || null;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getInitialUser);
  const [loading] = useState(false);

  function signup({ name, email, countryCode, phone, password }) {
    const users = getUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      name,
      email,
      countryCode,
      phone,
      password,
      firstName: "",
      lastName: "",
      infoCompleted: false,
      profile: null,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true };
  }

  function login({ identifier, password }) {
    const users = getUsers();
    const found = users.find(
      (u) =>
        (u.email.toLowerCase() === identifier.toLowerCase() ||
          u.name.toLowerCase() === identifier.toLowerCase()) &&
        u.password === password
    );

    if (!found) {
      return {
        success: false,
        message: "Invalid email/username or password.",
      };
    }

    localStorage.setItem(SESSION_KEY, found.email);
    setCurrentUser(found);

    return { success: true, isNewUser: !found.infoCompleted };
  }

  function completeUserInfo(profileData) {
    const users = getUsers();
    const updated = users.map((u) =>
      u.email === currentUser.email
        ? {
            ...u,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            infoCompleted: true,
            profile: profileData,
          }
        : u
    );
    saveUsers(updated);

    const updatedUser = updated.find((u) => u.email === currentUser.email);
    setCurrentUser(updatedUser);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  }

  function requestPasswordReset(email) {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!found) {
      return { success: false, message: "No account found with this email." };
    }

    const token = Math.random().toString(36).slice(2, 10);
    localStorage.setItem(`resetToken_${email.toLowerCase()}`, token);

    return { success: true, token };
  }

  function resetPassword({ email, token, newPassword }) {
    const storedToken = localStorage.getItem(
      `resetToken_${email.toLowerCase()}`
    );
    if (!storedToken || storedToken !== token) {
      return { success: false, message: "Invalid or expired reset link." };
    }

    const users = getUsers();
    const updated = users.map((u) =>
      u.email.toLowerCase() === email.toLowerCase()
        ? { ...u, password: newPassword }
        : u
    );
    saveUsers(updated);
    localStorage.removeItem(`resetToken_${email.toLowerCase()}`);

    return { success: true };
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