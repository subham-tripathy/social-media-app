import { Link, useNavigate } from "react-router-dom";
import {
  formStyle,
  headerStyle,
  inputStyle,
  primaryButton,
} from "./functions";
import { useState } from "react";
import { toast } from "react-toastify";

export function Login() {
  const navigate = useNavigate();
  const [uid, setUid] = useState("");
  const [pw, setPw] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
        pw: pw,
      }),
    }).then((res) => {
      if (res.ok) {
        toast.success("Logged In successfully");
        navigate("/");
        return;
      }
      if (res.status === 400) {
        res.json().then((data) => {
          toast.error(data.message);
        });
        return;
      }
    });
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className={formStyle}
      >
        <h1 className={headerStyle}>Welcome again, please login here !</h1>
        <input
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className={inputStyle}
          type="text"
          placeholder="Enter ID"
          required
        />
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className={inputStyle}
          type="password"
          placeholder="Enter PW"
          required
        />
        <span className="flex justify-between text-gray-700 dark:text-gray-400 font-semibold">
          <Link to={"/signup"}>Not have account?</Link>
          <Link to={"/forget-pw"}>Forgot password</Link>
        </span>
        <button className={primaryButton} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
