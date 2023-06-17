import React, { useEffect, useState } from "react";
import axios from "axios";

export const PostList = ({ refresh }) => {
  const [posts, setPosts] = useState({});

  console.log(refresh);

  const fetchPosts = async () => {
    const res = await axios({
      method: "get",
      url: "http://localhost:4000/posts",
    });
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
