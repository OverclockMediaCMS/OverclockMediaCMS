import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard";
import { Settings } from "./screens/Settings";
import  Profile from "./screens/Profile";
import { Posts } from "./screens/Posts";
import { Media } from "./screens/Media";
import { CreatePost } from "./screens/CreatePost";
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

  return(
    <BrowserRouter>
    <Layout>
      <div>
      <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route element={<MustBeLoggedIn/>}>
          <Route element={<WithNavBar/>}>
            <Route path="/Dashboard" element={<Dashboard/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/Settings" element={<Settings/>}/>
            <Route path="/Media" element={<Media/>}/>
            <Route path="/Posts" element={<Posts/>}/>
            <Route path="/ViewPost/:id" element={<ViewPost/>}/>
          </Route>
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

// uncomment body of function to enforce must be logged in 

function MustBeLoggedIn(){
  const context = useGlobalContext();

  // if(!context?.user){
  //   return <Navigate to="/Login" replace />
  // }
  
  return <Outlet/>

}
function WithNavBar(){
  return(
    <>
    <div className="app">
      <Navbar/>
    <div className="content">
      <Outlet/>
    </div>
    </div>
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

