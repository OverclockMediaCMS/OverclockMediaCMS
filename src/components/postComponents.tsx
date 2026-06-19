import { useEffect, useState, type FC } from "react";
import type { CreateComment, Post, TOCItem } from "../models";
import type { Comment } from "../models";
import commentIcon from "../assets/comment.png";
import plusIcon from "../assets/plus.png";
import "../style/post.css";
import { useGlobalContext } from "../GlobalContext";
import { useApi } from "../utilities/useApi";
import ReactMarkdown from 'react-markdown';
import { MediaInPostDisplay } from "./mediaComponents";
import "../style/media.css";

export const PostLimitedDisplay: FC<Post & { onClick: () => void }> = ({ Title, User, Tags, Comments, Date: rawDate, onClick }) => {
  const dateValue = new Date(rawDate).toLocaleDateString([], {
    hour: '2-digit', minute: '2-digit', year: "2-digit", month: "2-digit", day: '2-digit'
  });

  return (
    <div className="postLimited" onClick={onClick}>
      <div>
        <p style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px', color: '#1d2327' }}>{Title}</p>
        <p style={{ fontSize: '13px', color: '#646970', margin: '0 0 4px' }}>
          Written by {User.FirstName}{User.LastName ? ` ${User.LastName}` : ''} on {dateValue}
        </p>
        {Tags.length > 0 && (
          <p style={{ fontSize: '12px', color: '#8c8f94', margin: 0 }}>
            Tags: {Tags.map(t => t.Title).join(', ')}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, marginLeft: '16px' }}>
        <span style={{ fontSize: '13px', color: '#646970' }}>{Comments.length}</span>
        <img src={commentIcon} style={{ width: '20px', height: '20px' }} />
      </div>
    </div>
  );
};

export const PostDetailedDisplay: FC<Post> = ({ id: Id, Media, Title, Body, User, Tags, Comments, Date: rawDate }) => {
  const { getFromEndpoint, postToEndpoint } = useApi();
  const [newComment, setNewComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(Comments);
  const [tableOfContents, setTableOfContents] = useState<TOCItem[]>([]);
  const context = useGlobalContext();

  const dateValue = new Date(rawDate).toLocaleDateString([], {
    hour: '2-digit', minute: '2-digit', year: "2-digit", month: "2-digit", day: '2-digit'
  });

  async function refreshComments() {
    const response = await getFromEndpoint(`comments/${Id}`, null);
    const body = await response.json();
    setComments(body as Comment[]);
  }

  async function createComment() {
    if (!context!.user) { window.alert("No user logged in!"); return; }
    const c: CreateComment = { UserId: context!.user!.id, Description: commentText, PostId: Id };
    const response = await postToEndpoint("comment", c);
    if (response.status != 200) {
      window.alert((await response.json()).error);
    } else {
      setNewComment(false);
      setCommentText("");
      refreshComments();
    }
  }

  function createTableOfContents(text: string) {
    const lines = text.split("\n");
    const items: TOCItem[] = [];
    for (const line of lines) {
      if (line.startsWith("###")) items.push({ name: line.substring(4), type: 3 });
      else if (line.startsWith("##")) items.push({ name: line.substring(3), type: 2 });
    }
    setTableOfContents(items);
  }

  const toSlug = (text: string) => text.trim().toLowerCase().replace(/\s+/g, '-');
  const scrollToHeading = (name: string) => document.getElementById(toSlug(name))?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => { createTableOfContents(Body); }, []);

  const displayName = User.LastName ? `${User.FirstName} ${User.LastName}` : User.FirstName;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '24px 32px', maxWidth: '900px', margin: '0 auto' }}>

      <div className="postDetailedHeader">
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '6px', textAlign: 'center' }}>{Title}</h1>
        <p style={{ fontSize: '14px', color: '#646970', marginBottom: '4px' }}>By {displayName} on {dateValue}</p>
        {Tags.length > 0 && (
          <p style={{ fontSize: '13px', color: '#8c8f94' }}>Tags: {Tags.map(t => t.Title).join(', ')}</p>
        )}
      </div>

      {tableOfContents.length > 0 && (
        <div className="postDetailedTOC" style={{ maxWidth: '320px', alignSelf: 'flex-start', marginTop: '16px' }}>
          <p style={{ fontWeight: '700', marginBottom: '10px', fontSize: '15px', color: '#1d2327' }}>Table of Contents</p>
          {tableOfContents.map((item) => (
            <div
              key={item.name}
              onClick={() => scrollToHeading(item.name)}
              style={{
                fontWeight: item.type === 2 ? '600' : '400',
                fontStyle: item.type === 3 ? 'italic' : 'normal',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '3px 0',
                paddingLeft: item.type === 3 ? '12px' : '0',
                color: '#2271b1',
                lineHeight: '1.5'
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}

      <div className="postDetailedBody">
        <ReactMarkdown components={{
          h2: ({ children }) => <h2 id={toSlug(String(children))}>{children}</h2>,
          h3: ({ children }) => <h3 id={toSlug(String(children))}>{children}</h3>
        }}>{Body}</ReactMarkdown>
      </div>

      {Media.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          {Media.map((item) => (
            <MediaInPostDisplay key={item.id} id={item.id} Title={item.Title} FileExtension={item.FileExtension} FilePath={item.FilePath} Date={item.Date} User={item.User} />
          ))}
        </div>
      )}

      <div style={{ marginTop: '24px' }}>
        <button
          onClick={() => setNewComment(!newComment)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#1d2327', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', cursor: 'pointer', marginBottom: '16px' }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#3c434a')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#1d2327')}
        >
          <img src={plusIcon} style={{ width: '16px', height: '16px' }} /> Add Comment
        </button>

        {newComment && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              style={{ flex: 1, padding: '8px 12px', border: '1px solid #8c8f94', borderRadius: '4px', fontSize: '14px' }}
            />
            <button
              onClick={createComment}
              style={{ padding: '8px 16px', backgroundColor: '#2271b1', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', cursor: 'pointer' }}
            >
              Save
            </button>
          </div>
        )}

        <CommentSection comments={comments} />
      </div>
    </div>
  );
};

const CommentIconWithCounter: FC<{ num: number }> = ({ num }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    <span style={{ fontSize: '13px', color: '#646970' }}>{num}</span>
    <img src={commentIcon} style={{ width: '20px', height: '20px' }} />
  </div>
);

export const CommentSection: FC<{ comments: Array<Comment> }> = ({ comments }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {comments.map((c) => (
      <CommentDisplay key={c.id} id={c.id} Description={c.Description} User={c.User} Date={c.Date} />
    ))}
  </div>
);

const CommentDisplay: FC<Comment> = ({ User, Description, Date: rawDate }) => {
  const dateValue = new Date(rawDate).toLocaleDateString([], {
    hour: '2-digit', minute: '2-digit', year: "2-digit", month: "2-digit", day: '2-digit'
  });
  const displayName = User.LastName ? `${User.FirstName} ${User.LastName}` : User.FirstName;
  return (
    <div style={{ border: '1px solid #e0e0e0', borderRadius: '6px', padding: '12px 16px' }}>
      <p style={{ fontWeight: '600', fontSize: '13px', color: '#1d2327', marginBottom: '4px' }}>
        {displayName} <span style={{ fontWeight: '400', color: '#646970' }}>· {dateValue}</span>
      </p>
      <p style={{ fontSize: '14px', color: '#3c434a', margin: 0 }}>{Description}</p>
    </div>
  );
};