import React, { useState } from "react";
import { PostCreate } from "./components/PostCreate";
import { PostList } from "./components/PostList";

export default function App() {
  const [count, setCount] = useState(0);

  //watch for new posts
  const isNewPost = (created) => {
    created && setCount((prev) => prev + 1);
  };
  return (
    <div className="container">
      <h1>Create posts</h1>
      <PostCreate isNewPost={isNewPost} />
      <hr />
      <h1>Posts</h1>
      <PostList refresh={count} />
    </div>
  );
}
