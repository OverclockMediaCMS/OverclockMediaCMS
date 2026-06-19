import { useEffect, useState } from "react";
import { useApi } from "../utilities/useApi.tsx";
import type { LoginUser, User } from "../models.tsx";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalContext.tsx";
import eyeIcon from "../assets/eye.png";
import closeEyeIcon from "../assets/eyeCross.png";

export function Login() {
  const { postToEndpoint } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pinputType, setpinputType] = useState("password");
  const [eyeImg, setEyeImg] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const context = useGlobalContext();

  async function submit() {
    const u: LoginUser = { Email: email, Password: password };
    const response = await postToEndpoint("users/login", u);
    const body = await response.json();
    if (response.status == 200) {
      const user: User = body.user;
      const jwt: string = body.token;
      context?.setUser(user);
      context?.setJwt(jwt);
      navigate("/Dashboard");
    } else {
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

  useEffect(() => {
    setEyeImg(closeEyeIcon);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <div style={{ backgroundColor: '#1d2327', padding: '16px 24px 12px', width: '320px', boxSizing: 'border-box', borderRadius: '4px 4px 0 0', display: 'flex', justifyContent: 'center' }}>
        <svg width="200" height="44" viewBox="0 0 680 140" xmlns="http://www.w3.org/2000/svg">
          <text x="20" y="95" fontFamily="Arial Black, Impact, sans-serif" fontSize="82" fontWeight="900" fontStyle="italic" fill="#ffffff" letterSpacing="3">OVERCLOCK</text>
          <text x="24" y="128" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="400" fill="#ffffff" letterSpacing="22">MEDIA</text>
        </svg>
      </div>

      <div style={{ background: 'white', padding: '24px 24px 20px', width: '320px', boxSizing: 'border-box', borderRadius: '0 0 4px 4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#1d2327' }}>Username or Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', height: '34px', boxSizing: 'border-box', padding: '0 10px', border: '1px solid #8c8f94', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#1d2327' }}>Password</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type={pinputType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', height: '34px', boxSizing: 'border-box', padding: '0 10px', border: '1px solid #8c8f94', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
            />
            <img src={eyeImg} onClick={togglePasswordView} style={{ width: '22px', height: 'auto', cursor: 'pointer', flexShrink: 0 }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <label htmlFor="rememberMe" style={{ fontSize: '13px', cursor: 'pointer', color: '#1d2327' }}>Remember Me</label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            onClick={() => navigate("/Register")}
            style={{ fontSize: '13px', color: '#2271b1', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register
          </span>
          <button
            onClick={submit}
            style={{ backgroundColor: '#2271b1', color: 'white', border: 'none', borderRadius: '3px', padding: '8px 18px', fontSize: '13px', cursor: 'pointer' }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#135e96')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2271b1')}
          >
            Log In
          </button>
        </div>

      </div>
    </div>
  );
}