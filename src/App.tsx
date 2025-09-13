import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "./AppContetxt";
import Login from "./components/Login/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home/Home";
import { useState } from "react";
import type { LoginRes } from "./service/auth";
function App() {
  const [userData, setUserData] = useState<LoginRes | undefined>(undefined);
  const token = localStorage.getItem("token") || "";
  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      <ToastContainer position="top-right" autoClose={1500} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={!token ? "/auth/login" : `/home`} />}
          />
          <Route path="/auth/login" element={<Login />} />
          <Route
            path="/home"
            element={
              token?.trim() !== "" ? <Home /> : <Navigate to={"/auth/login"} />
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
