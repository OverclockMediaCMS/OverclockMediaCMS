import { useEffect, useState } from "react";
import { useApi } from "../utilities/useApi.tsx";
import type { User, CreateUser } from "../models.tsx";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalContext.tsx";
import eyeIcon from "../assets/eye.png";
import closeEyeIcon from "../assets/eyeCross.png";

export function Register() {
  const { postToEndpoint } = useApi();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pinputType, setpinputType] = useState("password");
  const [eyeImg, setEyeImg] = useState("");
  const navigate = useNavigate();

  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function submit() {
    const u: CreateUser = {
      FirstName: fname,
      LastName: lname,
      Email: email,
      Password: password,
    };
    const response = await postToEndpoint("users/register", u);
    if (response.status == 200) {
      navigate("/Login");
    } else {
      const body = await response.json();
      window.alert(body.error);
    }
  }

  function togglePasswordView() {
    if (pinputType === "password") {
      setpinputType("text");
      setEyeImg(eyeIcon);
    } else {
      setpinputType("password");
      setEyeImg(closeEyeIcon);
    }
  }

  function validateString(input: string): boolean {
    return input.length >= 2 && input.length <= 50;
  }

  function validateInputs() {
    let valid = true;
    setFnameError("");
    setLnameError("");
    setEmailError("");
    setPasswordError("");

    if (!validateString(fname)) { setFnameError("Please enter a valid first name"); valid = false; }
    if (!validateString(lname)) { setLnameError("Please enter a valid last name"); valid = false; }
    if (!email.includes("@")) { setEmailError("Please enter a valid email"); valid = false; }
    if (!validateString(password)) { setPasswordError("Please enter a valid password"); valid = false; }
    if (valid) submit();
  }

  useEffect(() => {
    setEyeImg(closeEyeIcon);
  }, []);

  const inputStyle: React.CSSProperties = {
    width: '100%', height: '34px', boxSizing: 'border-box',
    padding: '0 10px', border: '1px solid #8c8f94',
    borderRadius: '4px', fontSize: '14px', outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '14px', marginBottom: '6px', color: '#1d2327',
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '12px', color: '#d63638', marginBottom: '4px', display: 'block',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <div style={{ backgroundColor: '#1d2327', padding: '16px 24px 12px', width: '360px', boxSizing: 'border-box', borderRadius: '4px 4px 0 0', display: 'flex', justifyContent: 'center' }}>
        <svg width="200" height="44" viewBox="0 0 680 140" xmlns="http://www.w3.org/2000/svg">
          <text x="20" y="95" fontFamily="Arial Black, Impact, sans-serif" fontSize="82" fontWeight="900" fontStyle="italic" fill="#ffffff" letterSpacing="3">OVERCLOCK</text>
          <text x="24" y="128" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="400" fill="#ffffff" letterSpacing="22">MEDIA</text>
        </svg>
      </div>

      <div style={{ background: 'white', padding: '24px 24px 20px', width: '360px', boxSizing: 'border-box', borderRadius: '0 0 4px 4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>First Name</label>
          {fnameError && <span style={errorStyle}>{fnameError}</span>}
          <input value={fname} onChange={(e) => setFname(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Last Name</label>
          {lnameError && <span style={errorStyle}>{lnameError}</span>}
          <input value={lname} onChange={(e) => setLname(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Email</label>
          {emailError && <span style={errorStyle}>{emailError}</span>}
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Password</label>
          {passwordError && <span style={errorStyle}>{passwordError}</span>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type={pinputType} value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            <img src={eyeImg} onClick={togglePasswordView} style={{ width: '22px', height: 'auto', cursor: 'pointer', flexShrink: 0 }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            onClick={() => navigate("/Login")}
            style={{ fontSize: '13px', color: '#2271b1', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Back to Login
          </span>
          <button
            onClick={validateInputs}
            style={{ backgroundColor: '#2271b1', color: 'white', border: 'none', borderRadius: '3px', padding: '8px 18px', fontSize: '13px', cursor: 'pointer' }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#135e96')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2271b1')}
          >
            Register
          </button>
        </div>

      </div>
    </div>
  );
}