import type { FC } from "react"
import type { Media } from "../models"
import '../style/media.css'

export const MediaLimitedDisplay: FC<Media> = ({ Title, FileExtension, FilePath, User, Date: rawDate }) => {
  const dateValue = new Date(rawDate).toLocaleDateString([], {
    hour: '2-digit', 
    minute: '2-digit', 
    year: "2-digit", 
    month: "2-digit", 
    day: '2-digit'
  });

  // parse database text columns back into arrays
  let parsedPaths: string[] = [];
  let parsedExtensions: string[] = [];

  try {
    parsedPaths = JSON.parse(FilePath);
    parsedExtensions = JSON.parse(FileExtension);
  } catch (e) {
    parsedPaths = [FilePath];
    parsedExtensions = [FileExtension];
  }

  return (
    <div className='mediaLimited'>
      {/* Gallery preview */}
      <div className="media-preview-box">
        {parsedPaths.map((path, index) => {
          const currentExt = parsedExtensions[index] || '';
          const assetUrl = `http://localhost:3000/media-files/${path}`;
          
          const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(currentExt.toLowerCase());
          const isVideo = ['mp4', 'webm', 'ogg'].includes(currentExt.toLowerCase());

          return (
            <div key={index} className="media-grid-item">
              {isImage ? (
                <img src={assetUrl} alt={Title} className="media-preview-element" />
              ) : isVideo ? (
                <video src={assetUrl} controls muted playsInline className="media-preview-element" />
              ) : (
                <div className="unknown-file-icon">.{currentExt.toUpperCase()}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Uploader details */}
      <h1>{Title}</h1>
      <h2>Uploaded by {User?.FirstName || "Unknown User"} at {dateValue}</h2>
    </div>
  )
}