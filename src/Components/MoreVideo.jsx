import React from "react";
import { Link } from "react-router-dom";

const styles = {
  container: {
    margin: "1rem",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  thumbnail: {
    width: "80px",
    height: "46px",
    marginRight: "1rem",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  category: {
    fontSize: "0.8rem",
    color: "gray",
    marginBottom: "0.5rem",
  },
  views: {
    fontSize: "0.8rem",
    color: "gray",
  },
};

export default function MoreVideo({ data }) {
  return (
    <div>
      {data.map((eachVideo) => (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/category/${eachVideo.category}/video/${eachVideo._id}`}
        >
          <div key={eachVideo._id} style={styles.container}>
            <img
              src={eachVideo.thumbnail}
              alt={eachVideo.title}
              style={styles.thumbnail}
            />
            <div style={styles.infoContainer}>
              <div style={styles.title}>{eachVideo.title}</div>
              <div style={styles.category}>{eachVideo.category}</div>
              <div style={styles.views}>{`${eachVideo.views} views`}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
