import React, { useState } from "react";
import axios from "axios";

export const CommentCreate = ({ postID, isNewComment }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios({
      method: "post",
      url: `http://localhost:4001/posts/${postID}/comments`,
      data: { content },
    });

    setContent("");
    isNewComment(true);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
