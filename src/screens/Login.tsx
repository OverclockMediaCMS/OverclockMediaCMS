import { useEffect, useState } from "react";
import {useApi} from "../utilities/useApi.tsx"
import type {LoginUser, User} from "../models.tsx"
import { NavigationButton } from "../components/navigationComponents.tsx";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalContext.tsx";
import eyeIcon from "../assets/eye.png"
import closeEyeIcon from "../assets/eyeCross.png"

export function Login(){
  const {postToEndpoint} = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pinputType, setpinputType] = useState("password");
  const [eyeImg, setEyeImg] = useState("");
  const navigate = useNavigate();
  const context = useGlobalContext();

  async function submit(){
    const u : LoginUser = {
      Email:email,
      Password:password,
    }
    const response = await postToEndpoint("users/login", u); 
    const body = await response.json();
    if(response.status == 200){
      const user : User = body;
      const jwt : string = body;
      context?.setUser(user);
      context?.setJwt(jwt);
      navigate("/Dashboard");
    }else{
      window.alert(body.error);
    }
 
  }
  function togglePasswordView(){
    if(pinputType === "password"){
      setpinputType("text");
      setEyeImg(eyeIcon);
    }else{
      setpinputType("password");
      setEyeImg(closeEyeIcon);
    }
  }

  useEffect (() => {
    setEyeImg(closeEyeIcon);
  }, []);
  return(
    <div>
      <label style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5vh'}}>
      <h1>Login</h1>
        <text>Email:</text>
        <input style={{width: '25vh'}} value={email} onChange={ (e) => {setEmail(e.target.value)}}></input>
        <text>Password:</text>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '25vh'}}>
          <input type={pinputType} value={password} onChange={ (e) => {setPassword(e.target.value)}}></input>
          <img style={{display: 'flex', width: '5vh', height: 'auto'}} src={eyeImg} onClick={()=>{togglePasswordView()}}></img>
        </div>
        <button onClick={submit}>Submit</button>
        <button onClick={ () => navigate("/Register")}>Register</button>
      </label>
    </div>
  )
}

