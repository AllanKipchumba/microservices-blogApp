import React, { useState } from "react";
import axios from "axios";

export const PostCreate = ({ isNewPost }) => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios({
      method: "post",
      url: "http://posts.com/posts/create",
      data: { title },
    });

    setTitle("");
    isNewPost(true);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit </button>
      </form>
    </div>
  );
};
