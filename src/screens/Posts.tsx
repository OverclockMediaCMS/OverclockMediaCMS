import { useEffect, useState } from "react";
import type { Post } from "../models";
import { getFromEndpoint } from "../helpers";
import {PostLimitedDisplay } from "../components/postComponents";
import "../style/post.css"
import { useNavigate } from "react-router-dom";

export function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [query, setQuery] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(-1);

  const fetchData = async (searchParams : string | null) => {
    let response;
    if(searchParams !== null){
      const query = {contains : searchParams}
      response = await getFromEndpoint("posts", query);
    }else{
      response = await getFromEndpoint("posts", null);
    }
    const body = await response.json();
    const posts: Array<Post> = body;
    setPosts(posts);
  }
  useEffect(() => {
    fetchData(null);
  }, []);
  useEffect(() => {
    if(selectedPostId != -1){
      navigate(`/ViewPost/${selectedPostId}`)
    }
  }, [selectedPostId]);
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
          Comments={post.Comments}
          onClick= {() =>{setSelectedPostId(post.id)}}
          />
      ))}</div>
    </div>
  )
}
