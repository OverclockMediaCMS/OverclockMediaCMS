import type { FC } from "react"
import type { Media } from "../models"
import '../style/media.css'


export const MediaLimitedDisplay: FC<Media> = ({ Title, FileExtension, User, Date : rawDate }) => {
  const dateValue = new Date(rawDate).toLocaleDateString([], 
    {
        hour: '2-digit', minute: '2-digit', year: "2-digit", month: "2-digit", day: '2-digit'
    });
    return (
    <div className='mediaLimited'>
      <h1>{Title}.{FileExtension}</h1>
      <h2>Uploaded by {User.FirstName} at {dateValue}</h2>
    </div >
  )
}