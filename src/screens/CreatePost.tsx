import { useEffect, useState } from "react";
import { useApi } from "../utilities/useApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../GlobalContext";
import Markdown from 'react-markdown';
import { MediaInPostDisplay } from '../components/mediaComponents';
import type { Media } from '../models';

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
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    if (incomingDraft?.Media) setMedia(incomingDraft.Media);
  }, []);

  useEffect(() => {
    return () => { previews.forEach((f) => URL.revokeObjectURL(f.url)); };
  }, [previews]);

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;
    const mediaFiles: PreviewFile[] = [];
    const validFiles: File[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        mediaFiles.push({ url: URL.createObjectURL(file), type: file.type });
        validFiles.push(file);
      }
    });
    setPreviews((prev) => [...prev, ...mediaFiles]);
    setSelectedFiles((prev) => [...prev, ...validFiles]);
    event.target.value = "";
  }

  function removeFile(i: number) {
    URL.revokeObjectURL(previews[i].url);
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!context?.user) { setErrorMessage("A user must be loaded before creating a post."); return; }
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const formData = new FormData();
      formData.append("Title", title);
      formData.append("Body", postBody);
      formData.append("isDraft", String(isDraft));
      formData.append("UserId", String(context.user.id));
      selectedFiles.forEach((file) => formData.append("media", file));
      const response = await postToEndpoint("posts/create", formData);
      if (!response || response.status !== 200) throw new Error("Could not process your post submission.");
      const data = await response.json();
      const returnId = data.response?.id;
      setIsSubmitting(false);
      if (selectedFiles.length > 0) navigate("/media");
      else navigate(`/ViewPost/${returnId}`);
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during submission.");
      setIsSubmitting(false);
    }
  }

  const s = {
    page: { backgroundColor: "#f4f4f4", minHeight: "100vh", padding: "32px 40px", fontFamily: "sans-serif", color: "#222" } as React.CSSProperties,
    h1: { fontSize: "1.8rem", fontWeight: 600, margin: "0 0 4px 0", color: "#111" } as React.CSSProperties,
    subtitle: { fontSize: "0.9rem", color: "#666", margin: 0 } as React.CSSProperties,
    card: { background: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" } as React.CSSProperties,
    fieldWrap: { display: "flex", flexDirection: "column", gap: "6px" } as React.CSSProperties,
    fieldLabel: { fontSize: "0.75rem", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" } as React.CSSProperties,
    input: { background: "#f8f8f8", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "10px 14px", fontSize: "0.95rem", color: "#222", outline: "none", fontFamily: "sans-serif", width: "100%", boxSizing: "border-box" } as React.CSSProperties,
    textarea: { background: "#f8f8f8", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "10px 14px", fontSize: "0.95rem", color: "#222", outline: "none", fontFamily: "sans-serif", resize: "vertical", lineHeight: 1.6, width: "100%", boxSizing: "border-box", minHeight: "120px" } as React.CSSProperties,
    uploadZone: { background: "#f8f8f8", border: "1px dashed #ccc", borderRadius: "8px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", cursor: "pointer", color: "#888", fontSize: "0.9rem", textAlign: "center" } as React.CSSProperties,
    draftRow: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8f8f8", borderRadius: "8px", padding: "12px 16px", flexWrap: "wrap", gap: "8px" } as React.CSSProperties,
    btnPrimary: (disabled: boolean) => ({ display: "flex", alignItems: "center", gap: "8px", background: disabled ? "#999" : "#111", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 22px", fontSize: "0.9rem", fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer" } as React.CSSProperties),
    btnSecondary: { display: "flex", alignItems: "center", gap: "8px", background: "transparent", color: "#555", border: "1px solid #ccc", borderRadius: "8px", padding: "10px 18px", fontSize: "0.9rem", cursor: "pointer" } as React.CSSProperties,
    previewCard: { background: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", overflow: "hidden" } as React.CSSProperties,
    previewHeader: { padding: "10px 20px", borderBottom: "1px solid #e0e0e0", fontSize: "0.75rem", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" } as React.CSSProperties,
    previewBody: { padding: "20px", fontSize: "0.95rem", lineHeight: 1.7, color: "#222", minHeight: "60px" } as React.CSSProperties,
  };

  return (
    <div style={s.page}>

      <div style={{ marginBottom: "8px" }}>
        <h1 style={s.h1}>{incomingDraft ? "Edit draft" : "Create post"}</h1>
        <p style={s.subtitle}>{incomingDraft ? "Update your saved draft" : "Write something and share it with the community"}</p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <button type="button" onClick={() => navigate(-1)} style={s.btnSecondary}>← Back</button>
      </div>

      <form name="fileinfo" onSubmit={handleSubmit}>
        <div style={s.card}>

          {/* Title */}
          <div style={s.fieldWrap}>
            <label htmlFor="cp-title" style={s.fieldLabel}>Title</label>
            <input
              id="cp-title" type="text" placeholder="Enter a title (required)"
              required maxLength={64} minLength={2} value={title}
              onChange={(e) => setTitle(e.target.value)} style={s.input}
            />
          </div>

          {/* Media */}
          <div style={s.fieldWrap}>
            <label style={s.fieldLabel}>Media</label>
            <label htmlFor="cp-media" style={s.uploadZone}>
              <span style={{ fontSize: "22px", color: "#bbb" }}>↑</span>
              <span>Click to attach images or videos</span>
              <span style={{ fontSize: "0.78rem", color: "#bbb" }}>PNG, JPG, GIF, MP4 supported</span>
              <input id="cp-media" type="file" name="media" multiple accept="image/*,video/*" onChange={handleFiles} style={{ display: "none" }} />
            </label>
            {media.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "4px" }}>
                {media.map((item) => (
                  <MediaInPostDisplay key={item.id} id={item.id} Title={item.Title} FileExtension={item.FileExtension} FilePath={item.FilePath} Date={item.Date} User={item.User} />
                ))}
              </div>
            ) : (
              <span style={{ fontSize: "0.8rem", color: "#bbb", marginTop: "2px" }}>No media attached.</span>
            )}
          </div>

          {/* File previews */}
          {previews.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {previews.map((file, index) => (
                <div key={index} onClick={() => removeFile(index)} title="Click to remove"
                  style={{ position: "relative", cursor: "pointer", borderRadius: "8px", overflow: "hidden", border: "1px solid #e0e0e0", flexShrink: 0 }}>
                  {file.type.startsWith("image/") ? (
                    <img src={file.url} alt={`Preview ${index}`} style={{ width: 160, height: 120, objectFit: "cover", display: "block" }} />
                  ) : (
                    <video src={file.url} controls style={{ width: 160, height: 120, objectFit: "cover", display: "block" }} />
                  )}
                  <div style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.6)", color: "#fff", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>×</div>
                </div>
              ))}
            </div>
          )}

          {/* Body */}
          <div style={s.fieldWrap}>
            <label htmlFor="cp-body" style={s.fieldLabel}>Post body</label>
            <textarea
              id="cp-body" placeholder="Write your post (required)"
              required rows={5} maxLength={2000} minLength={2} value={postBody}
              onChange={(e) => setPostBody(e.target.value)} style={s.textarea}
            />
            <div style={{ fontSize: "0.75rem", color: "#aaa", textAlign: "right" }}>{postBody.length} / 2000</div>
          </div>

          {/* Draft toggle */}
          <div style={s.draftRow}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", cursor: "pointer" }}>
              <input type="checkbox" checked={isDraft} onChange={(e) => setIsDraft(e.target.checked)}
                style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#111" }} />
              Save as draft
            </label>
            <span style={{ fontSize: "0.8rem", color: "#999" }}>Drafts are only visible to you</span>
          </div>

          {errorMessage && (
            <div style={{ fontSize: "0.85rem", color: "#c00", background: "#fff0f0", borderRadius: "8px", padding: "10px 14px", border: "1px solid #fcc" }}>
              {errorMessage}
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button type="submit" disabled={isSubmitting} style={s.btnPrimary(isSubmitting)}>
              {isSubmitting ? "Saving…" : isDraft ? "Save Draft" : "Publish"}
            </button>
            <button type="button" onClick={() => navigate(-1)} style={s.btnSecondary}>Discard</button>
          </div>

        </div>
      </form>

      {/* Preview */}
      <div style={s.previewCard}>
        <div style={s.previewHeader}>Preview</div>
        <div style={s.previewBody}>
          <Markdown>{postBody || "*Nothing to preview yet…*"}</Markdown>
        </div>
      </div>

    </div>
  );
}