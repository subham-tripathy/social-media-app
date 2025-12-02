import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import NavBar from "./components/NavBar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login.jsx";
import SignUp from "./components/Signup.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <main className="flex gap-2">
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </main>
  </BrowserRouter>
);
