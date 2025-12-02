import { House, Search, SendHorizonal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/me").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data);
        });
      }
    });
  }, []);

  useEffect(() => {}, [user]);
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
          {user != null ? (
            <Link to="/profile">
              <User className="hover:scale-125" />
            </Link>
          ) : (
            <Link to="/login">
              <User className="hover:scale-125" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
