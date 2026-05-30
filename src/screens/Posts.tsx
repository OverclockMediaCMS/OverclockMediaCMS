import { useEffect, useState } from "react";
import type { Post } from "../models";
import { getFromEndpoint } from "../utilities/helpers";
import { PostDetailedDisplay, PostLimitedDisplay } from "../utilities/postComponents";
import "../style/post.css"

export function Posts() {
  const [posts, setPosts] = useState<Array<Post>>([])
  const [query, setQuery] = useState("");
  const fetchData = async (contains : string) => {
    let u = await getFromEndpoint(`posts/${contains}`);
    let posts: Array<Post> = u;
    setPosts(posts);
  }
  useEffect(() => {
    fetchData("");
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <label>
        <input type="text" value={query} onChange= { (e) => {setQuery(e.target.value)}}></input>
        <button onClick={(e) => {fetchData(query)}}>Search</button>
      </label>
      <div className="postList"> {posts.map((post) => (
        <PostLimitedDisplay key={post.id}
          id={post.id}
          Title={post.Title}
          Body={post.Body}
          User={post.User}
          isDraft={post.isDraft}
          Tags={post.Tags}
          Date={post.Date}
        />
      ))}</div>
    </div>
  )
}
