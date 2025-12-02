import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {

  formStyle,
  headerStyle,
  inputStyle,
  primaryButton,
} from "./functions";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        uid: uid,
        pw: pw,
        email: email,
      }),
    }).then((res) => {
      if (res.ok) {
        toast.success("Account created successfully");
      } else if (res.status === 400) {
        toast.error("User already exists");
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
        <h1 className={headerStyle}>Welcome To "Social Media App"</h1>
        <h1 className={headerStyle}>Start your incredible journey with us</h1>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={inputStyle}
          type="text"
          name="name"
          placeholder="Enter Name:"
          required
        />
        <input
          value={uid}
          onChange={(e) => {
            setUid(e.target.value);
          }}
          className={inputStyle}
          type="text"
          name="uid"
          placeholder="Enter UID:"
          required
        />
        <input
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          className={inputStyle}
          type="password"
          name="pw"
          placeholder="Enter PW:"
          required
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className={inputStyle}
          type="email"
          name="email"
          placeholder="Enter Email:"
          required
        />
        <Link
          className="text-gray-700 dark:text-gray-400 font-semibold"
          to={"/login"}
        >
          Already have account?
        </Link>
        <button className={primaryButton} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
