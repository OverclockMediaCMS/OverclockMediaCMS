import { useEffect, useState } from "react";
import type { Media } from "../models";
import { getFromEndpoint } from "../helpers";
import { MediaLimitedDisplay } from "../components/mediaComponents";
import '../style/media.css'

export function Media(){
    const [media, setMedia] = useState<Array<Media>>([]);
    const [query, setQuery] = useState("");
    const fetchData = async (contains : string) => {
      let u = await getFromEndpoint(`media/${contains}`);
      let media: Array<Media> = u;
      setMedia(media);
    }
    
    useEffect(() => {
      fetchData("");
    }, []);
  return(
    <div>
      <h1>Media</h1>
      <label>
        <input type="text" value={query} onChange= { (e) => {setQuery(e.target.value)}}></input>
        <button onClick={(e) => {fetchData(query)}}>Search</button>
      </label>
      <div className="mediaList"> {media.map((media) => (
              <MediaLimitedDisplay key={media.id}
                id={media.id}
                Title={media.Title}
                User={media.User}
                FileExtension={media.FileExtension}
                FilePath={media.FilePath}
                Date={media.Date}
              />))}
      </div>
    </div>
  )
}