import { useEffect, useState } from "react";
import {postToEndpoint} from "../helpers.tsx"
import type {User, CreateUser} from "../models.tsx"
import { useNavigate} from "react-router-dom";
import { useGlobalContext } from "../GlobalContext.tsx";

export function Register(){
  
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submit(){
    const u : CreateUser = {
      FirstName: fname,
      LastName: lname,
      Email: email,
      Password: password,
    }
    const response = await postToEndpoint("users/register", u);
    if(response.status == 200){
      navigate("/Login");
    }else{
      const body = await response.json();
      window.alert(body);
    }
  }

  useEffect (() => {
    
  }, []);
  return(
    <div>
      <label style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5vh'}}>
        <h1>Please enter your details below to register</h1>
        <text>First Name:</text>
        <input value={fname} onChange={ (e) => {setFname(e.target.value)}}></input>
        <text>Last Name:</text>
        <input value={lname} onChange={ (e) => {setLname(e.target.value)}}></input>
        <text>Email:</text>
        <input value={email} onChange={ (e) => {setEmail(e.target.value)}}></input>
        <text>Password:</text>
        <input value={password} onChange={ (e) => {setPassword(e.target.value)}}></input>
        <button onClick={submit}>Submit</button>
      </label>
    </div>
  )
}

