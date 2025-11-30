import { Link } from "react-router-dom";
import { formStyle, headerStyle, inputStyle, primaryButton } from "./functions";

export function Login() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form className={formStyle}>
        <h1 className={headerStyle}>Welcome again, please login here !</h1>
        <input
          className={inputStyle}
          type="text"
          name="uid"
          id="uid"
          placeholder="Enter ID"
        />
        <input
          className={inputStyle}
          type="password"
          name="pw"
          id="pw"
          placeholder="Enter PW"
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
