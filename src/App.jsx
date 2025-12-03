import { useEffect, useState } from "react";

export default function App() {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    fetch("/api/allposts").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          setAllPosts(data.posts);
        });
      }
    });
  }, []);
  return (
    <main className="justify-center flex flex-col gap-5 py-7">
      {allPosts != null
        ? allPosts.map((post) => {
            return (
              <div
                key={post.fileUrl}
                className="bg-gray-600 rounded-md px-7 py-5 mx-auto w-[35%]"
              >
                <p>{post.caption}</p>
                <p>posted at: {new Date(post.createdAt).toLocaleString()}</p>
                <br />
                <img
                  className="shadow shadow-black rounded-md"
                  src={post.fileUrl}
                />
              </div>
            );
          })
        : null}
    </main>
  );
}
