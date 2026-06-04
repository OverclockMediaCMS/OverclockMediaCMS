import { useEffect, useState, type FC } from "react";
import type { CreateComment, Post } from "../models";
import type { Comment } from "../models";
import commentIcon from "../assets/comment.png"
import plusIcon from "../assets/plus.png"
import "../style/post.css"
import { useGlobalContext } from "../GlobalContext";
import { getFromEndpoint, postToEndpoint } from "./helpers";
//generic element for displaying post, takes post model as interface

export const PostLimitedDisplay: FC<Post & {onClick: () => void}> = ({ Title, User, Tags, Comments, Date : rawDate, onClick }) => {
  const dateValue = new Date(rawDate).toLocaleDateString([], 
  {
      hour: '2-digit', minute: '2-digit', year: "2-digit", month: "2-digit", day: '2-digit'
  });
  const hasComments = Comments.length;
  return (
    <div className='postLimited'>
      <div onClick={onClick} >
        <h1>{Title}</h1>
        <h2>Written by {User.FirstName} on {dateValue}</h2>
        <ul>{Tags.map((tag) => (
          <p key={tag.id}> Tags: {tag.Title}</p>
        ))}</ul>
      </div >
        <div className="commentIcon">
          <CommentIconWithCounter num={Comments.length}/>
        </div>
   </div>
  )
}

export const PostDetailedDisplay: FC<Post> = ({ id, Title, Body, User, Tags, Comments }) => {
  const [newComment, setNewComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(Comments);

  const context = useGlobalContext();
  
  async function refreshComments(){
    let c = await getFromEndpoint(`comments/${id}`);
    setComments(c);
  }
  async function createComment(){
    let c : CreateComment = {
      UserId: context!.user!.id,
      Description: commentText,
      PostId: id
    }
    await postToEndpoint("comment", c);
    setNewComment(false);
    setCommentText("");
    refreshComments();
  }
  
  return (
    <div className='postDetalied'>
      <h1>{Title}</h1>
      <h2>Written by {User.FirstName}</h2>
      <ul> {Tags.map((tag) => (
        <p key={tag.id}> Tags: {tag.Title}</p>
      ))}
      </ul>
      <p>{Body}</p>
      <label style={{display: 'flex', flexDirection: 'row'}} onClick={ () => {setNewComment(!newComment)}}>
        <img src={plusIcon} className="commentIcon"></img>
        <text style={{fontSize: '3vh'}}>Add Comment</text>
      </label>
      {newComment && (
        <label style={{display: 'flex', flexDirection: 'row'}}>
          <input value={commentText} onChange={ (e) => {setCommentText(e.target.value)}}></input>
          <button onClick={createComment}>Save</button>
        </label>
      )}
      <CommentSection comments={comments}/>
    </div >
  )
}

const CommentIconWithCounter: FC<{num : number}> = ({num}) => {
  return(
    <div>
      <label style={{display: 'flex', flexDirection: 'row'}}>
        <text style={{fontSize: '3vh'}}>{num}</text>
        <img src={commentIcon} className="commentIcon"></img>
      </label>
    </div>
  )
}

export const CommentSection: FC<{comments: Array<Comment>}> = ({comments}) => {
  return(
    <div>
      <ul>{comments.map((c) => (
        <CommentDisplay
        key={c.id}
        id={c.id}
        Description={c.Description}
        User={c.User}
        Date={c.Date}/>
      ))}
      </ul>
    </div>  
  )
}

const CommentDisplay: FC<Comment> = ({User, Description, Date : rawDate}) => {
  const dateValue = new Date(rawDate).toLocaleDateString([], 
  {
      hour: '2-digit', minute: '2-digit', year: "2-digit", month: "2-digit", day: '2-digit'
  });
  return(
    <div className="postDetailedComment">
    <label style={{fontWeight: 'bold'}}>{User.FirstName} {User.LastName}  
      --- {dateValue}
    </label>
    <label>{Description}</label>
    </div>
  )
}


