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

  const [passwordError, setPasswordError] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordErrorField, setPasswordErrorField] = useState("hidden");
  const [fnameErrorField, setFnameErrorField] = useState("hidden");
  const [lNameErrorField, setLnameErrorField] = useState("hidden");
  const [emailErrorField, setEmailErrorField] = useState("hidden");

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
  function validateInputs(){
    let valid = true;
    if(!validateString(fname)){
      valid = false;
      setFnameError("Please enter a valid first name");
    }
    if(!validateString(lname)){
      valid = false;
      setLnameError("Please enter a valid last name");
    }
    if(!validateString(password)){
      valid = false;
      setPasswordError("Please enter a valid password");
    }
    if(!email.includes("@")){
      valid = false;
      setEmailError("Please enter a valid email");
    }
    if(valid){
      submit();
    }
  }
  function validateString(input : string) : boolean {
    let valid = true;
    if(input.length > 50 || input.length < 2){
      valid = false;
    }
    return valid;
  }
  useEffect (() => {
    setEyeImg(closeEyeIcon);
  }, []);
  useEffect (() => {
    setPasswordErrorField("text");
  }, [passwordErrorField]);
  useEffect (() => {
    setFnameErrorField("text");
  }, [fnameErrorField]);
  useEffect (() => {
    setLnameErrorField("text");
  }, [lNameErrorField]);
  useEffect (() => {
    setEmailErrorField("text");
  }, [emailErrorField]);
  return(
    <div>
      <label style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5vh', justifyContent: 'center'}}>
        <h1>Please enter your details below to register</h1>
        <text>First Name:</text>
        <text type={fnameErrorField} style={{color: 'red'}}>{fnameError}</text>
        <input style={{width: '25vh'}}value={fname} onChange={ (e) => {setFname(e.target.value)}}></input>
        <text>Last Name:</text>
        <text type={lNameErrorField} style={{color: 'red'}}>{lnameError}</text>
        <input style={{width: '25vh'}} value={lname} onChange={ (e) => {setLname(e.target.value)}}></input>
        <text>Email:</text>
        <text type={emailErrorField} style={{color: 'red'}}>{emailError}</text>
        <input style={{width: '25vh'}} value={email} onChange={ (e) => {setEmail(e.target.value)}}></input>
        <text>Password:</text>
        <text type={passwordErrorField} style={{color: 'red'}}>{passwordError}</text>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '25vh'}}>
          <input type={pinputType} value={password} onChange={ (e) => {setPassword(e.target.value)}}></input>
          <img style={{display: 'flex', width: '5vh', height: 'auto'}} src={eyeImg} onClick={()=>{togglePasswordView()}}></img>
        </div>
        <button onClick={validateInputs}>Submit</button>
        <button onClick={ () => navigate("/Login")}>Login</button>
      </label>
    </div>
  )
}

