import { useEffect, useState } from "react";
import type { Media } from "../models";
import { useApi } from "../utilities/useApi";
import { MediaLimitedDisplay } from "../components/mediaComponents";
import { useNavigate, Link } from "react-router-dom";
import '../style/media.css'

export function Media() {
  const navigate = useNavigate();
  const { getFromEndpoint } = useApi();
  const [media, setMedia] = useState<Array<Media>>([]);
  const [query, setQuery] = useState("");
  const [selectedExtension, setSelectedExtension] = useState("");
  const [availableExtensions, setAvailableExtensions] = useState<Array<string>>([]);

  useEffect(() => {
    fetchData("", "", true);
  }, []);

  const fetchData = async (searchParams: string | null, extensionFilter: string, isInitialLoad = false) => {
    let response;
    const hasSearchWord = searchParams && searchParams.trim() !== "";

    if (hasSearchWord || extensionFilter !== "") {
      const queryObj: any = {};
      if (hasSearchWord) queryObj.contains = searchParams;
      if (extensionFilter !== "") queryObj.fileExtension = extensionFilter;
      response = await getFromEndpoint("media", queryObj);
    } else {
      response = await getFromEndpoint("media", null);
    }

    const body = await response.json();
    const fetchedMedia = Array.isArray(body) ? body : body ? [body] : [];
    setMedia(fetchedMedia);

    if (isInitialLoad && fetchedMedia.length > 0) {
      const allExtensions = fetchedMedia.map((m: Media) => m.FileExtension.toLowerCase());
      setAvailableExtensions(Array.from(new Set<string>(allExtensions)));
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(query, selectedExtension);
  };

  return (
    <div className="media-page">

      <h1>Media</h1>

      {/* Search + filter */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <select
          value={selectedExtension}
          onChange={(e) => setSelectedExtension(e.target.value)}
          className="dropdown"
        >
          <option value="">All file types</option>
          {availableExtensions.map((ext) => (
            <option key={ext} value={ext}>.{ext.toUpperCase()}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search media titles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {/* Actions */}
      <div className="action">
        <button onClick={() => navigate("/CreatePost")}>
          <span>+</span> Add New Post
        </button>
        <Link to="/drafts">See drafts</Link>
      </div>

      {/* Media list */}
      <div className="mediaDisplayBox">
        <ul className="mediaList">
          {media.length > 0 ? (
            media.map((item) => (
              <MediaLimitedDisplay
                key={item.id}
                id={item.id}
                Title={item.Title}
                FileExtension={item.FileExtension}
                FilePath={item.FilePath}
                Date={item.Date}
                User={item.User}
              />
            ))
          ) : (
            <p style={{ color: "#888", fontSize: "14px" }}>No media matched your filters.</p>
          )}
        </ul>
      </div>

    </div>
  );
}