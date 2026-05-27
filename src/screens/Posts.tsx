import { useEffect, useState } from "react";
import type { Post } from "../models";
import { getFromEndpoint } from "../utilities/helpers";
import { PostDetailedDisplay, PostLimitedDisplay } from "../utilities/postDisplay";
import "../style/post.css"
export function Posts() {
  const [posts, setPosts] = useState<Array<Post>>([])
  useEffect(() => {
    const fetchData = async () => {
      let u = await getFromEndpoint("posts");
      let posts: Array<Post> = u;
      setPosts(posts);
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Posts</h1>
      <div className="postList"> {posts.map((post) => (
        <PostLimitedDisplay key={post.id}
          id={post.id}
          Title={post.Title}
          Body={post.Body}
          User={post.User}
          isDraft={post.isDraft}
          Tags={post.Tags}
        />
      ))}</div>
    </div>
  )
}
