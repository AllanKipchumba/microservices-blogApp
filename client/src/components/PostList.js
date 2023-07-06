import React, { useEffect, useState } from "react";
import axios from "axios";
import { CommentCreate } from "./CommentCreate";
import { CommentList } from "./CommentList";

export const PostList = ({ refresh }) => {
  const [posts, setPosts] = useState({});
  const [count, setCount] = useState(0);

  //watch for new comments
  const isNewComment = (created) => {
    created && setCount((prev) => prev + 1);
  };

  const fetchPosts = async () => {
    const res = await axios({
      method: "get",
      url: "http://posts.com/posts",
    });
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh, count]);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postID={post.id} isNewComment={isNewComment} />
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
