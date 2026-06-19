import { useEffect, useState } from "react";
import type { Post } from '../models'
import { useApi } from "../utilities/useApi";
import { PostDetailedDisplay } from "../components/postComponents";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../components/navigationComponents";




export function ViewPost() {
  const { getFromEndpoint } = useApi();
  const [thisPost, setThisPost] = useState<Post | null>(null)
  const { id: thisId } = useParams();
  const navigate = useNavigate();

  const fetchPost = async () => {
    const query = { id: thisId }
    let response = await getFromEndpoint("posts", query);
    let body = await response.json();
    let post: Post = body;
    setThisPost(post);
  }
  useEffect(() => {
    fetchPost();
  }, [thisId])
  if (thisPost == null) return null;

  return (
    <div>
      <div style={{ justifyContent: 'flex-start', width: '10vh' }}>
        <BackButton />
      </div>
      <PostDetailedDisplay
        key={thisPost.id}
        id={thisPost.id}
        Title={thisPost.Title}
        FileExtension={thisPost.FileExtension}
        FilePath={thisPost.FilePath}
        Body={thisPost.Body}
        User={thisPost.User}
        isDraft={thisPost.isDraft}
        Tags={thisPost.Tags}
        Date={thisPost.Date}
        Comments={thisPost.Comments} />
    </div>

  )
}