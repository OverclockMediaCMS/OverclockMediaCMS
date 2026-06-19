import { useEffect, useState } from "react";
import { useApi } from "../utilities/useApi.tsx";
import type { Media, Post } from "../models.tsx";
import { PostLimitedDisplay } from "../components/postComponents.tsx";
import { MediaLimitedDisplay } from "../components/mediaComponents.tsx";
import '../style/post.css';
import '../style/media.css';
import '../style/dashboard.css';
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { getFromEndpoint } = useApi();
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [media, setMedia] = useState<Array<Media>>([]);
  const [selectedPostId, setSelectedPostId] = useState(-1);
  const navigate = useNavigate();

  const fetchData = async () => {
    const mediaResponse = await getFromEndpoint("media", null);
    const postsResponse = await getFromEndpoint("posts", null);
    const mBody = await mediaResponse.json();
    const pBody = await postsResponse.json();
    setPosts(pBody);
    setMedia(mBody);
  };

  useEffect(() => {
    if (selectedPostId != -1) navigate(`/ViewPost/${selectedPostId}`);
  }, [selectedPostId, navigate]);

  useEffect(() => { fetchData(); }, []);

  return (
    <div style={{ padding: '24px 32px', maxWidth: '900px' }}>

      <h1 style={{ fontSize: '26px', fontWeight: '600', marginBottom: '24px', color: '#1d2327' }}>Dashboard</h1>

      {/* Recent Posts */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1d2327', margin: 0 }}>Recent Posts</h2>
          <button
            onClick={() => navigate("/Posts")}
            style={{ background: 'none', border: 'none', color: '#2271b1', fontSize: '14px', cursor: 'pointer', padding: 0 }}
            onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            See all posts →
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {posts.length > 0 ? (
            posts.slice(0, 3).map((post) => (
              <PostLimitedDisplay
                key={post.id}
                Media={post.Media}
                id={post.id}
                Title={post.Title}
                Body={post.Body}
                User={post.User}
                isDraft={post.isDraft}
                Tags={post.Tags}
                Date={post.Date}
                Comments={post.Comments}
                onClick={() => setSelectedPostId(post.id)}
              />
            ))
          ) : (
            <p style={{ color: '#646970', fontSize: '14px' }}>No posts found.</p>
          )}
        </div>
      </div>

      {/* Recent Media */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1d2327', margin: 0 }}>Recent Media</h2>
          <button
            onClick={() => navigate("/Media")}
            style={{ background: 'none', border: 'none', color: '#2271b1', fontSize: '14px', cursor: 'pointer', padding: 0 }}
            onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            See all media →
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {media.length > 0 ? (
            media.slice(0, 3).map((item) => (
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
            <p style={{ color: '#646970', fontSize: '14px' }}>No media found.</p>
          )}
        </div>
      </div>

    </div>
  );
}