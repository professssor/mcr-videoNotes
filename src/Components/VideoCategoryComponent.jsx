import React from "react";
import { Link } from "react-router-dom";

const VideoCategoryComponent = ({ id, thumbnail, src, category }) => {
  return (
    <div
      style={{
        background: "#F8F6F4",
        display: "block",
        border: "1px   ",
        borderRadius: "1rem",
        padding: "10px",
        marginBottom: "10px",
        maxWidth: "300px",
        textAlign: "center",
      }}
    >
      <Link to={`/category/${category}`}>
        <img
          src={thumbnail}
          alt={`Thumbnail for ${category}`}
          style={{ width: "100%" }}
        />
        <h3 style={{ margin: "10px 0", color: "#333" }}>{category}</h3>
        {/* <video
        src={src}
        controls
        style={{
          width: "100%",
          maxHeight: "200px",
          outline: "none",
        }}
      /> */}
      </Link>
    </div>
  );
};

export default VideoCategoryComponent;
