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
import { Register } from "./screens/Register";
import { Login } from "./screens/Login";
import { GeneralSetting } from "./screens/GeneralSetting";
import { DraftsList } from "./screens/Drafts";

export default function App(){
  const context = useGlobalContext();

  return(
    <BrowserRouter>
    <Layout>
      <div>
      <div>
      <Routes>
  <Route element={<WithoutNavBar/>}>
    <Route path="/" element={<Login/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/Login" element={<Login/>}/>
  </Route>
  <Route element={<MustBeLoggedIn/>}>
    <Route element={<WithNavBar/>}>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/Settings" element={<Settings/>}/>
      <Route path="/Media" element={<Media/>}/>
      <Route path="/Posts" element={<Posts/>}/>
      <Route path="/settings/general" element={<GeneralSetting/>}/>
      <Route path="/ViewPost/:id" element={<ViewPost/>}/>
      <Route path="/CreatePost" element={<CreatePost/>}/>
      <Route path="/Drafts" element={<DraftsList/>}/>
    </Route>
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

