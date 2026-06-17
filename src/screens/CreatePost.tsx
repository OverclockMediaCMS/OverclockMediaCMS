import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from "react";
import { useApi } from "../utilities/useApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../GlobalContext";
import "../style/post.css"
import Markdown from 'react-markdown';

type PreviewFile = {
  url: string;
  type: string;
};

export function CreatePost() {
  const { postToEndpoint } = useApi();
  const context = useGlobalContext();
  const navigate = useNavigate();

  const location = useLocation();
  const incomingDraft = location.state?.incomingDraft;

  const [title, setTitle] = useState(incomingDraft?.Title || "");
  const [postBody, setPostBody] = useState(incomingDraft?.Body || "");
  const [isDraft, setIsDraft] = useState(incomingDraft?.isDraft || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    return () => {
      previews.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [previews]);

  // FIXED: Appends new files to your previous selection instead of replacing them
  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;

    const mediaFiles: PreviewFile[] = [];
    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const objectUrl = URL.createObjectURL(file);
        mediaFiles.push({
          url: objectUrl,
          type: file.type,
        });
        validFiles.push(file);
      }
    });

    // Spread old state files alongside the newly selected uploads
    setPreviews((prev) => [...prev, ...mediaFiles]);
    setSelectedFiles((prev) => [...prev, ...validFiles]);

    // Clear the input target value so selecting the same file again triggers onChange
    event.target.value = "";
  }

  // OPTIONAL BONUS: Allows users to click an item to remove it from the attachment bundle
  function removeFile(indexToRemove: number) {
    URL.revokeObjectURL(previews[indexToRemove].url);
    setPreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!context?.user) {
      setErrorMessage("A user must be loaded before creating a post.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("Title", title);
      formData.append("Body", postBody);
      formData.append("isDraft", String(isDraft));
      formData.append("UserId", String(context.user.id));

      // Append every single file using the matching field key expected by your multer array handler
      selectedFiles.forEach((file) => {
        formData.append("media", file);
      });

      const response = await postToEndpoint("posts/create", formData);

      if (!response || response.status !== 200) {
        throw new Error("Could not process your post submission.");
      }

      const data = await response.json();
      const returnId = data.response?.id;

      setIsSubmitting(false);

      if (selectedFiles.length > 0) {
        navigate(`/media`); 
      } else {
        navigate(`/ViewPost/${returnId}`);
      }

    } catch (error: any) {
      console.error("Submission failed:", error);
      setErrorMessage(error.message || "An error occurred during submission.");
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Create Post</h1>

      <form name="fileinfo" onSubmit={handleSubmit}>
        <p>
          <label>
            Title
            <input
              type="text"
              name="Title"
              placeholder="Enter title (required)"
              required
              size={32}
              maxLength={64}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </p>

        <p>
          <label>
            Add media:
            <input
              type="file"
              name="media"
              multiple
              accept="image/*,video/*"
              onChange={handleFiles}
            />
          </label>
        </p>

        {/* Preview container */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
          {previews.map((file, index) => (
            <div 
              key={index} 
              onClick={() => removeFile(index)} 
              style={{ position: 'relative', cursor: 'pointer' }}
              title="Click to remove"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={file.url}
                  alt={`Preview ${index}`}
                  style={{ width: 200, height: 150, objectFit: "cover", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              ) : (
                <video
                  src={file.url}
                  controls
                  style={{ width: 200, height: 150, objectFit: "cover", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              )}
              <div style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>×</div>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="Post">Post</label>
          <br />
          <textarea
            id="Post"
            name="Body"
            placeholder="Write a Post (required)"
            required
            rows={4}
            maxLength={2000}
            value={postBody}
            onChange={(event) => setPostBody(event.target.value)}
          />
        </div>

        <p>
          <label>
            Save as draft
            <input
              type="checkbox"
              name="isDraft"
              checked={isDraft}
              onChange={(event) => setIsDraft(event.target.checked)}
            />
          </label>
        </p>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <p>
          <input
            type="submit"
            value={isDraft ? "Save Draft" : "Publish"}
            disabled={isSubmitting}
          />
        </p>
      </form>
      
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>Preview</h2>
      <div style={{ padding: '10px', border: '1px solid black', background: '#fff' }}>
        <Markdown>{postBody}</Markdown>
      </div>
    </div>
  );
}