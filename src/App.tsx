import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard";
import { Settings } from "./screens/Settings";
import { Profile } from "./screens/Profile";
import { Posts } from "./screens/Posts";
import { Media } from "./screens/Media";
import { Navbar } from "./utilities/Navbar";
import { CreatePost } from "./screens/CreatePost"


export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Settings" element={<Settings/>}/>
        <Route path="/Media" element={<Media/>}/>
        <Route path="/Posts" element={<Posts/>}/>
        <Route path="/CreatePost" element={<CreatePost/>}/>
      </Routes>
    <Navbar/>
    </BrowserRouter>
  )
}
