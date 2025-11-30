import { House, Search, SendHorizonal, User } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  // route wise bg image
  useEffect(() => {
    switch (location.pathname) {
      case "/login":
        document.body.style.backgroundImage = "url(/bg2.jpg)";
        break;
      case "/signup":
        document.body.style.backgroundImage = "url(/bg1.jpg)";
        break;
    }
  }, [location.pathname]);

  return (
    <nav className="px-3 flex flex-col w-[5%] h-screen bg-transparent">
      <h1 className="text-xl font-semibold">LOGO</h1>
      <ul className="flex flex-col grow justify-center gap-5">
        <li>
          <Link to="/">
            <House className="hover:scale-125" />
          </Link>
        </li>
        <li>
          <Link to="/search">
            <Search className="hover:scale-125" />
          </Link>
        </li>
        <li>
          <Link to="/message">
            <SendHorizonal className="hover:scale-125" />
          </Link>
        </li>
        <li>
          <Link to="/login">
            <User className="hover:scale-125" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
