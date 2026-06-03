import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard";
import { Settings } from "./screens/Settings";
import { Profile } from "./screens/Profile";
import { Posts } from "./screens/Posts";
import { Media } from "./screens/Media";
import { ViewPost } from "./screens/ViewPost";
import { Navbar } from "./utilities/navbar";
import './style/app.css'
import { useGlobalContext } from "./GlobalContext";
import { getFromEndpoint } from "./utilities/helpers";
import type { User } from "./models";
import { useEffect } from "react";

export default function App(){
  const context = useGlobalContext();
  async function setUserById(id:number) {
    let u = await getFromEndpoint(`users/${id}`);
    let newUser : User = u;
    if(u != undefined){
      context?.setUser(newUser);
    }
  }
  useEffect( () => {
    setUserById(1);
  }, [])
  return(
    <BrowserRouter>
      <div className="app">
    <Navbar/>
      <div className="content">
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Settings" element={<Settings/>}/>
        <Route path="/Media" element={<Media/>}/>
        <Route path="/Posts" element={<Posts/>}/>
        <Route path="/ViewPost/:id" element={<ViewPost/>}/>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}
