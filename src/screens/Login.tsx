import { useEffect, useState } from "react";
import {useApi} from "../utilities/useApi.tsx"
import type {LoginUser, User} from "../models.tsx"
import { NavigationButton } from "../components/navigationComponents.tsx";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalContext.tsx";

export function Login(){
  const {postToEndpoint} = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  useEffect (() => {

  }, []);
  return(
    <div>
      <label style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5vh'}}>
      <h1>Login</h1>
        <text>Email:</text>
        <input value={email} onChange={ (e) => {setEmail(e.target.value)}}></input>
        <text>Password:</text>
        <input value={password} onChange={ (e) => {setPassword(e.target.value)}}></input>
        <button onClick={submit}>Submit</button>
        <button onClick={ () => navigate("/Register")}>Register</button>
      </label>
    </div>
  )
}

