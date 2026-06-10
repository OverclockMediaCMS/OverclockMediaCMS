import { useEffect, useState } from "react";
import type {Post} from '../models'
import { getFromEndpoint } from "../helpers";
import { PostDetailedDisplay } from "../components/postComponents";
import { useParams } from "react-router-dom";

export function ViewPost(){
  const [thisPost, setThisPost] = useState<Post | null>(null)
  const {id: thisId} = useParams();
  const fetchPost = async () => {
    const query = {id:thisId}
    let response = await getFromEndpoint("posts", query);
    let body = await response.json();
    let post: Post = body;
    setThisPost(post);
  }
  useEffect(() => {
    fetchPost();
  }, [thisId])
  if(thisPost == null) return null;

  return(
    <div>
      <PostDetailedDisplay key={thisPost.id}
        id={thisPost.id}
        Title={thisPost.Title}
        Body={thisPost.Body}
        User={thisPost.User}
        isDraft={thisPost.isDraft}
        Tags={thisPost.Tags}
        Date={thisPost.Date}
        Comments={thisPost.Comments}/>
    </div>
  )
}