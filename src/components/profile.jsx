import { useEffect, useState } from "react";
import { dangerButton, headerStyle, logout } from "./functions";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";

export default function Profile() {
  const [caption, setCaption] = useState("");
  const myPosts = [];
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/me").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data);
        });
      }
    });
    fetch("/api/myposts").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          for (let i = 0; i < data.posts.length; i++) {
            // console.log(data.posts[i].fileName);
            myPosts.push(data.posts[i].fileName);
          }
        });
      }
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          toast.success(data.message);
        });
      } else {
        res.json().then((data) => {
          console.log(data);
          toast.error(data.message);
        });
      }
    });
  };
  useEffect(() => {}, [user]);
  return (
    <>
      {user == null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1 className={headerStyle}>Hello, {user.name}</h1>
          <button
            className={dangerButton}
            onClick={(e) => {
              logout(e);
            }}
          >
            <LogOut />
            Logout
          </button>
          {myPosts.map((post) => {
            return (
              <div>
                <img src={`/api/media/${post}`} />
              </div>
            );
          })}
          <form onSubmit={handleSubmit}>
            <input
              value={caption}
              type="text"
              name="caption"
              onChange={(e) => setCaption(e.target.value)}
            />
            <input type="file" name="media" />
            <button type="submit">Upload</button>
          </form>
        </div>
      )}
    </>
  );
}
