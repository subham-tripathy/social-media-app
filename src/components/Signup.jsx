import { Link } from "react-router-dom";
import { formStyle, headerStyle, inputStyle, primaryButton } from "./functions";

export default function SignUp() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form className={formStyle}>
        <h1 className={headerStyle}>Welcome To "Social Media App"</h1>
        <h1 className={headerStyle}>Start your incredible journey with us</h1>
        <input
          className={inputStyle}
          type="text"
          name="name"
          id="name"
          placeholder="Enter Name:"
        />
        <input
          className={inputStyle}
          type="text"
          name="uid"
          id="uid"
          placeholder="Enter UID:"
        />
        <input
          className={inputStyle}
          type="text"
          name="pw"
          id="pw"
          placeholder="Enter PW:"
        />
        <input
          className={inputStyle}
          type="text"
          name="email"
          id="email"
          placeholder="Enter Email:"
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
