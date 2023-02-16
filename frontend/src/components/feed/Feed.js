import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";
import Navbar from "../navbar/Navbar";
import SignUpForm from "../user/SignUpForm"

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  // This is triggered whenever the page is loaded as token exists
  // Changing the state of the posts and token hooks
  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, [token]);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <>
      <Navbar />
        <h2>Posts</h2>
        <button onClick={logout}>Logout</button>
        <CreatePost
          setPosts={setPosts}
          token={token}
        /><br></br>
        <div id="feed" role="feed">
          {console.log(posts)}
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </>
    );
  } else {
    navigate("/signup");
  }
};

export default Feed;
