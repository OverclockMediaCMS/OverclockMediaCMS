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
  const { getFromEndpoint } = useApi();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [query, setQuery] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(-1);
  const [selectedTagId, setSelectedTagId] = useState("");

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
      response = await getFromEndpoint("posts", query);
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
      navigate(`/ViewPost/${selectedPostId}`);
    }
  }, [selectedPostId, navigate]);

  return (
    <div style={{ padding: '24px 32px', maxWidth: '900px' }}>

      <h1 style={{ fontSize: '26px', fontWeight: '600', marginBottom: '20px', color: '#1d2327' }}>Posts</h1>

      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
        <select
          value={selectedTagId}
          onChange={(e) => setSelectedTagId(e.target.value)}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #8c8f94', borderRadius: '4px', fontSize: '14px', backgroundColor: 'white', cursor: 'pointer', boxSizing: 'border-box' }}
        >
          <option value="">All Tags (No Filter)</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>{tag.Title}</option>
          ))}
        </select>

        <input
          type="text"
          value={query}
          placeholder="Search within criteria..."
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #8c8f94', borderRadius: '4px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
        />

        <button
          type="submit"
          style={{ width: '100%', padding: '10px 18px', backgroundColor: '#1d2327', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', cursor: 'pointer', boxSizing: 'border-box' }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#3c434a')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#1d2327')}
        >
          Search
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => navigate("/CreatePost")}
          style={{ width: '100%', padding: '10px 18px', backgroundColor: 'white', color: '#1d2327', border: '2px solid #1d2327', borderRadius: '4px', fontSize: '14px', cursor: 'pointer', boxSizing: 'border-box' }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = 'white')}
        >
          + Add New Post
        </button>
        <div style={{ textAlign: 'center' }}>
          <Link to="/drafts" style={{ fontSize: '14px', color: '#2271b1' }}>See drafts</Link>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostLimitedDisplay
              key={post.id}
              id={post.id}
              Title={post.Title}
              Body={post.Body}
              User={post.User}
              isDraft={post.isDraft}
              Tags={post.Tags}
              Date={post.Date}
              Comments={post.Comments}
              Media={post.Media}
              onClick={() => { setSelectedPostId(post.id) }}
            />
          ))
        ) : (
          <p style={{ color: '#646970', fontSize: '14px' }}>No results found matching your active filters.</p>
        )}
      </div>

    </div>
  );
}