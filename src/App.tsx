import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard";
import { Settings } from "./screens/Settings";
import  Profile from "./screens/Profile";
import { Posts } from "./screens/Posts";
import { Media } from "./screens/Media";
import { Navbar } from "./utilities/Navbar";
import Layout  from "./components/Layout"; // import Header Layout - Sirawit
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
  return(
    <BrowserRouter>
    <Layout>
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
      </Routes>
      </div>
    </div>
    </Layout>
    </BrowserRouter>
  )
}
