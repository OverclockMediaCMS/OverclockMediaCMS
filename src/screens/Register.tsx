import { useEffect, useState } from "react";
import {useApi} from "../utilities/useApi.tsx"
import type {User, CreateUser} from "../models.tsx"
import { useNavigate} from "react-router-dom";
import { useGlobalContext } from "../GlobalContext.tsx";
import eyeIcon from "../assets/eye.png"
import closeEyeIcon from "../assets/eyeCross.png"

export function Register(){
  const {postToEndpoint} = useApi();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pinputType, setpinputType] = useState("password");
  const [eyeImg, setEyeImg] = useState("");
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
      <label style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5vh', justifyContent: 'center'}}>
        <h1>Please enter your details below to register</h1>
        <text>First Name:</text>
        <input style={{width: '25vh'}}value={fname} onChange={ (e) => {setFname(e.target.value)}}></input>
        <text>Last Name:</text>
        <input style={{width: '25vh'}} value={lname} onChange={ (e) => {setLname(e.target.value)}}></input>
        <text>Email:</text>
        <input style={{width: '25vh'}} value={email} onChange={ (e) => {setEmail(e.target.value)}}></input>
        <text>Password:</text>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '25vh'}}>
          <input type={pinputType} value={password} onChange={ (e) => {setPassword(e.target.value)}}></input>
          <img style={{display: 'flex', width: '5vh', height: 'auto'}} src={eyeImg} onClick={()=>{togglePasswordView()}}></img>
        </div>
        <button onClick={submit}>Submit</button>
        <button onClick={ () => navigate("/Login")}>Login</button>
      </label>
    </div>
  )
}

