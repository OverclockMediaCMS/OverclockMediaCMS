import { useEffect, useState } from "react";
import {useApi} from "../utilities/useApi.tsx"
import type {Media, Post, User} from "../models.tsx"
import { PostLimitedDisplay } from "../components/postComponents.tsx";
import { MediaLimitedDisplay} from "../components/mediaComponents.tsx";
import '../style/post.css';
import '../style/media.css';
import '../style/dashboard.css'
import { useNavigate } from "react-router-dom";

export function Dashboard(){
  const {getFromEndpoint} = useApi();
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [media, setMedia] = useState<Array<Media>>([]);
  const [selectedPostId, setSelectedPostId] = useState(-1);
  
  const navigate = useNavigate();
  
  const fetchData = async () => {
    const mediaResponse = await getFromEndpoint("media", null);
    const postsResponse = await getFromEndpoint("posts", null);
    

    const mBody = await mediaResponse.json();
    const pBody = await postsResponse.json();
    const posts : Post[] = pBody;
    const media : Media[] = mBody;
    setPosts(posts);
    setMedia(media);
  }
  
  useEffect(() => {
    if (selectedPostId != -1) {
      navigate(`/ViewPost/${selectedPostId}`)
    }
  }, [selectedPostId, navigate]);

  useEffect(() => {
    fetchData();
  }, []);
  return(
    <div>
      <h1>Dashboard</h1>
      <h2>Recent Posts</h2>
      <div className="dashboardBox">
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
        <div style={{display: 'flex', justifyContent: 'right', marginRight: '2vh'}}>
          <button onClick={() => {navigate("/Posts")}}>See more posts</button>
        </div>
      <h2>Recent Media</h2>
      <div className="dashboardBox">
        <div className="mediaList">
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
            <p>No media resources matched your filter choices.</p>
          )}
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'right', marginRight: '2vh'}}>
          <button onClick={() => {navigate("/Media")}}>See more media</button>
        </div>
    </div>
  )
}

