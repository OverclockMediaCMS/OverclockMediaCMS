import { useEffect, useState, type FC } from "react";
import type { CreateComment, Post, TOCItem } from "../models";
import type { Comment } from "../models";
import commentIcon from "../assets/comment.png";
import plusIcon from "../assets/plus.png";
import "../style/post.css";
import { useGlobalContext } from "../GlobalContext";
import { useApi} from "../utilities/useApi";
import  ReactMarkdown  from 'react-markdown';
//generic element for displaying post, takes post model as interface

export const PostLimitedDisplay: FC<Post & {onClick: () => void}> = ({ Title, User, Tags, Comments, Date : rawDate, onClick }) => {
  const dateValue = new Date(rawDate).toLocaleDateString([], 
  {
      hour: '2-digit', minute: '2-digit', year: "2-digit", month: "2-digit", day: '2-digit'
  });
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

export const PostDetailedDisplay: FC<Post> = ({ id : Id, Title, Body, User, Tags, Comments, Date : rawDate }) => {
  const {getFromEndpoint, postToEndpoint} = useApi();
  const [newComment, setNewComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(Comments);
  const [tableOfContents, setTableOfContents] = useState<TOCItem[]>([]);

  const context = useGlobalContext();

  const dateValue = new Date(rawDate).toLocaleDateString([], 
  {
      hour: '2-digit', minute: '2-digit', year: "2-digit", month: "2-digit", day: '2-digit'
  });

  async function refreshComments(){
    const postid = Id;
    const response = await getFromEndpoint(`comments/${postid}`, null);
    const body = await response.json();
    const c : Array<Comment> = body;
    setComments(c);
  }

  async function createComment(){
    if(!context!.user){
      window.alert("no user logged in to send comment!");
      return;
    }
    let c : CreateComment = {
      UserId: context!.user!.id,
      Description: commentText,
      PostId: Id
    }
    let response = await postToEndpoint("comment", c);
    if(response.status != 200){
      let body = response.json();
      window.alert(body.error);
    }else{
      setNewComment(false);
      setCommentText("");
      refreshComments();
    }
  }

  function createTableOfContents(text: string){
    const lines = text.split("\n");
    let items : Array<TOCItem> = [];
    
    for(let line of lines){
      if(line.startsWith("###")){
        let l = line.substring(4);
        items.push({name:l, type: 3});
      }
      else if(line.startsWith("##")){
        let l = line.substring(3);
        items.push({name:l, type: 2});
      }
    }
    setTableOfContents(items);
  }

  const scrollToHeading = (name: string) => {
    document.getElementById(toSlug(name))?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    createTableOfContents(Body);
  }, []);

  const toSlug = (text: string) => text.trim().toLowerCase().replace(/\s+/g, '-');
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 'auto'}}>
    <div className='postDetailed'>
      <div className="postDetailedHeader">
        <h1>{Title}</h1>
        <h2>By {User.FirstName} {User.LastName} on {dateValue}</h2>
        <ul> {Tags.map((tag) => (
          <p key={tag.id}> Tags: {tag.Title}</p>
        ))}
        </ul>
      </div>
      <div className="postDetailedTOC">
        <h2>Table of Contents</h2>
        <ul>
          {tableOfContents.map((item) => (
            <div
            key={item.name}
            onClick={() => scrollToHeading(item.name)}
            style={{
              fontWeight: item.type === 2 ? 'bold' : 'normal',
              fontStyle: item.type === 3 ? 'italic' : 'normal',
              cursor: 'pointer',
            }}
            >
              {item.name}
            </div>
          ))}
        </ul>
      </div>
      <div className="postDetailedBody">
        <ReactMarkdown
        components={{
          h2: ({children}) => <h2 id={toSlug(String(children))}>{children}</h2>,
          h3: ({children}) => <h3 id={toSlug(String(children))}>{children}</h3>
        }}>{Body}</ReactMarkdown>
      </div>
    </div >
    <div>
      <label className="addCommentButton" onClick={ () => {setNewComment(!newComment)}}>
        <img src={plusIcon} className="commentIcon"></img>
        <text style={{fontSize: '3vh'}}>Add Comment </text>
      </label>
      {newComment && (
        <label>
          <input value={commentText} onChange={ (e) => {setCommentText(e.target.value)}}></input>
          <button onClick={createComment}>Save</button>
        </label>
      )}
      <CommentSection comments={comments}/>
    </div>
    </div>
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
    <div style={{display: 'flex'}}>
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


