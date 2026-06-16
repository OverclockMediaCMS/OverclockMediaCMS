import { useEffect, useState } from "react";
import type { Post } from "../models";
import { useApi } from "../utilities/useApi";
import { PostLimitedDisplay } from "../components/postComponents";
import "../style/post.css"
import { useNavigate, Link } from "react-router-dom";

interface Tag {
  id: number,
  Title: string
}

export function Posts() {
  const {getFromEndpoint} = useApi();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Array<Post>>([]);

  const [tags, setTags] = useState<Array<Tag>>([]); //Choices for dropdown filter

  const [query, setQuery] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(-1);

  const [selectedTagId, setSelectedTagId] = useState(""); //Track selected tag

  useEffect(() => {
    const fetchDropDownChoices = async () => {
      const response = await getFromEndpoint("tags", null);
      const data = await response.json();
      setTags(data.response || data);
    }

    fetchDropDownChoices();
    fetchData("", "");
  }, []);

  const fetchData = async (searchParams: string, tagFilterId: string) => {
    let response;

    if (searchParams.trim() !== "" || tagFilterId !== "") {
      const query: any = {};
      if (searchParams.trim() !== "") query.contains = searchParams;
      if (tagFilterId !== "") query.tagId = tagFilterId;

      response = await getFromEndpoint("posts", query)
    } else {
      response = await getFromEndpoint("posts", null);
    }

    const body = await response.json();
    setPosts(Array.isArray(body) ? body : body ? [body] : []);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(query, selectedTagId);
  };

  useEffect(() => {
    if (selectedPostId != -1) {
      navigate(`/ViewPost/${selectedPostId}`)
    }
  }, [selectedPostId, navigate]);


  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <select
          value={selectedTagId}
          onChange={(e) => setSelectedTagId(e.target.value)}
          className="dropdown"
        >
          <option value="">All Tags (No Filter)</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.Title}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={query}
          placeholder="Search within criteria..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="postDisplayBox">
        <Link to="/drafts">See drafts...</Link>
        <div className="postList">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostLimitedDisplay key={post.id}
                id={post.id}
                Title={post.Title}
                Body={post.Body}
                User={post.User}
                isDraft={post.isDraft}
                Tags={post.Tags}
                Date={post.Date}
                Comments={post.Comments}
                onClick={() => { setSelectedPostId(post.id) }}
              />
            ))
          ) : (
            <p>No results found matching your active filters.</p>
          )}
        </div>
      </div>
    </div>
  )


}
