import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import VideoCategoryComponent from "./Components/VideoCategoryComponent";
import { videos } from "./Data/videoData";
import IndividualCategory from "./Components/IndividualCategory";
import { categories } from "./Data/category";
import SingleVideoPage from "./Components/SingleVideopage";
import WatchLaterComp from "./Components/WatchLaterComp";
import ExploreComponent from "./Components/ExplorePage";
import Playlist from "./Components/Playlist";
import NoPlaylist from "./Components/NoPlaylist";

function App() {
  return (
    <div className="App">
      {/* container */}
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        {/* Individual Category Route */}
        <Route
          path="/category/:categoryName"
          element={<IndividualCategory />}
        />
        <Route
          path="/category/:categoryName/video/:videoId"
          element={<SingleVideoPage />}
        />

        <Route path="/noplaylist" element={<NoPlaylist />} />
        <Route path="watchlater" element={<WatchLaterComp />} />
        <Route path="/explore" element={<ExploreComponent />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </div>
  );
}

// Home Component
function Home() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
        }}
      >
        <section>
          <Sidebar />
        </section>
        <section>
          <h1>Categories</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "2rem",
            }}
          >
            {categories.map((video) => (
              <VideoCategoryComponent key={video._id} {...video} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
