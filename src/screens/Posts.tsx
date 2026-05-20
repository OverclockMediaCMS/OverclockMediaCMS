import { useEffect, useState } from "react";
import type { Post } from "../models";
import { getFromEndpoint } from "../utilities/helpers";
import { PostDisplay } from "../utilities/post";

export function Posts(){
    const [posts, setPosts] = useState<Array<Post>>([])
    useEffect (() => {
      const fetchData = async () => {
        let u = await getFromEndpoint("posts");
        let posts : Array<Post> = u;
        setPosts(posts);
      }
      fetchData();
    }, []);
  return(
    <div>
      <ul> {posts.map((post) => (
        <PostDisplay 
        key={post.id}
        id={post.id} 
        Title={post.Title}
        Body={post.Body}
        User={post.User}
        isDraft={post.isDraft}
        />
      ))}</ul>
    </div>
  )
}