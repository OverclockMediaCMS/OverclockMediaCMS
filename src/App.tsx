import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard";
import { Settings } from "./screens/Settings";
import  Profile from "./screens/Profile";
import { Posts } from "./screens/Posts";
import { Media } from "./screens/Media";
import Layout  from "./components/Layout"; // import Header Layout - Sirawit
import { ViewPost } from "./screens/ViewPost";
import { Navbar } from "./components/Navbar";
import './style/app.css'
import { useGlobalContext } from "./GlobalContext";
import { getFromEndpoint } from "./helpers";
import type { User } from "./models";
import { useEffect } from "react";
import { Register } from "./screens/Register";
import { Login } from "./screens/Login";

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
    <Layout>
      <div className="app">
      <div className="content">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route element={<WithNavBar/>}>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Settings" element={<Settings/>}/>
          <Route path="/Media" element={<Media/>}/>
          <Route path="/Posts" element={<Posts/>}/>
          <Route path="/ViewPost/:id" element={<ViewPost/>}/>
        </Route>
        <Route element={<WithoutNavBar/>}>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login/>}/>
        </Route>
      </Routes>
      </div>
    </div>
    </Layout>
    </BrowserRouter>
  )
}

function WithNavBar(){
  return(
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}
function WithoutNavBar(){
  return(
    <>
      <Outlet/>
    </>
  )
}

