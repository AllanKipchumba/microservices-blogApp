import React, { useEffect, useState } from "react";
import axios from "axios";

export const CommentList = ({ postID, count }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios({
        method: "get",
        url: `http://localhost:4001/posts/${postID}/comments`,
      });
      setComments(res.data);
    };
    fetchComments();
  }, [count, postID]);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
