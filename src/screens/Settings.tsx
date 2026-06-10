import React, { useEffect, useState } from 'react';
import '../style/settings.css';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../GlobalContext';

interface SettingItemProps {
  title: string;
  subtext: string;
}

const SettingItem: React.FC<SettingItemProps> = ({ title, subtext }) => (
  <div className="item-group">
    <h3 className="item-title">{title}</h3>
    <p className="subtext">{subtext}</p>
  </div>
);





export function Settings() {
  //Using global variables
  const context = useGlobalContext();
  //If context missing throw error
  if (!context) {
    throw new Error("Profile component must be used within a GlobalsProvider");
  }
  const { user, setUser } = context;
  const [profile, setProfile] = useState({
    FirstName: '',
    LastName: '',
    Role: '',
    Email: '',
    MobilePhone: '',
    InternalPhone: ''
  });
  const API_URL = `http://localhost:3000`;

  useEffect(() => {
    if (user) {
      setProfile({
        FirstName: user.FirstName || '',
        LastName: user.LastName || '',
        Role: '',
        Email: user.Email || '',
        MobilePhone: user.MobilePhone?.toString() || '-',
        InternalPhone: user.InternalPhone?.toString() || '-'
      });
    } else {

      fetch(`${API_URL}/users/1`)
        .then(res => {
          if (!res.ok) throw new Error("Couldn't fetch user data");
          return res.json();
        })
        .then(data => {
          const userData = data?.response || data;

          setProfile({
            FirstName: userData.FirstName || '',
            LastName: userData.LastName || '',
            Role: userData.Role || '',
            Email: userData.Email || '',
            MobilePhone: userData.MobilePhone?.toString() || '-',
            InternalPhone: userData.InternalPhone?.toString() || '-'
          });
        });
    }
  }, [user, setUser]);

  const fullName = `${profile.FirstName} ${profile.LastName}` || "No name"
  return (
    <main className='settingsContainer'>

      {/* Account Section */}
      <section className='settingsGroup'>
        <h2 className='groupTitle'>Account</h2>
        <Link to="/Profile">
          <div className='settingsCard'>
            <div className='profileInfo'>
              <div className='avatarPlaceholder'>
                {/* Replace with your SVG or Image asset */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className='textDetails'>
                <SettingItem title="Lorem Ipsum" subtext={fullName} />
                <SettingItem title="Full name" subtext={fullName} />
                <SettingItem title="Email" subtext={profile.Email} />
              </div>
            </div>
            <span className='chevron'></span>
          </div></Link>
      </section>

      {/* General Section */}
      <section className='settingsGroup'>
        <h2 className='groupTitle'>General</h2>
        <Link to="/settings/general" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='settingsCard'>
            <div className='textDetails'>
              <SettingItem title="Appearance" subtext="Customise the look and feel" />
              <SettingItem title="Background" subtext="Switch to dark or light mode" />
            </div>
            <span className='chevron'></span>
          </div>
        </Link>
      </section>

      {/* Content Section */}
      <section className='settingsGroup'>
        <h2 className='groupTitle'>Content</h2>
        <div className='settingsCard'>
          <div className='textDetails'>
            <SettingItem title="Tags" subtext="Manage your tags" />
            <SettingItem title="Categories" subtext="Manage your categories" />
          </div>
          <span className='chevron'></span>
        </div>
      </section>

    </main >
  )
}