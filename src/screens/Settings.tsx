import React from 'react';
import  '../style/settings.css';

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

export function Settings(){
  return(
    <main className='settingsContainer'>
      
      {/* Account Section */}
      <section className='settingsGroup'>
        <h2 className='groupTitle'>Account</h2>
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
              <SettingItem title="Lorem Ipsum" subtext="Lorem@overclockmedia.com" />
              <SettingItem title="Full name" subtext="Lorem Ipsum" />
              <SettingItem title="Email" subtext="Ipsum@overclockmedia.com" />
            </div>
          </div>
          <span className='chevron'></span>
        </div>
      </section>

      {/* General Section */}
      <section className='settingsGroup'>
        <h2 className='groupTitle'>General</h2>
        <div className='settingsCard'>
          <div className='textDetails'>
            <SettingItem title="Appearance" subtext="Customise the look and feel" />
            <SettingItem title="Background" subtext="Switch to dark or light mode" />
          </div>
          <span className='chevron'></span>
        </div>
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

    </main>
  )
}