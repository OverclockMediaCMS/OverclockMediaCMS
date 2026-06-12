import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../style/settings.css";

const colorOptions = [
    { id: 'blue', value: '#0066cc', name: 'Classic Blue' },
    { id: 'purple', value: '#8a2be2', name: 'Vibrant Purple' },
    { id: 'green', value: '#2e8b57', name: 'Forest Green' },
    { id: 'orange', value: '#ff4500', name: 'Sunset Orange' },
];

export function GeneralSetting() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        return localStorage.getItem('theme-mode') === 'dark';
    });

    const [themeColor, setThemeColor] = useState<string>(() => {
        return localStorage.getItem('theme-color') || 'blue';
    });


    useEffect(() => {
        const root = document.documentElement;

        // Handle dark/light mode attribute
        if (isDarkMode) {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme-mode', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme-mode', 'light');
        }

        // Handle primary color choice injection
        const selectedColorObj = colorOptions.find(c => c.id === themeColor);
        if (selectedColorObj) {
            root.style.setProperty('--primary-color', selectedColorObj.value);
        }
        localStorage.setItem('theme-color', themeColor);
    }, [isDarkMode, themeColor]);

    return (
    <main className='settingsContainer'>
      {/* Header with back button navigation */}
      <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Link to="/settings" style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </Link>
        <h2 className='groupTitle' style={{ margin: 0 }}>General Settings</h2>
      </header>

      {/* Mode toggle option item card */}
      <section className='settingsGroup'>
        <h3 className='groupTitle'>Display Theme</h3>
        <div className='settingsCard' style={{ justifyContent: 'space-between', cursor: 'default' }}>
          <div>
            <h3 className="item-title">Dark Mode</h3>
            <p className="subtext">Switch between a dark slate palette and standard light canvas.</p>
          </div>
          
          {/* Simple toggle switch component UI */}
          <label className="theme-switch" style={{ cursor: 'pointer', position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
            <input 
              type="checkbox" 
              checked={isDarkMode}
              onChange={(e) => setIsDarkMode(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span className={`slider ${isDarkMode ? 'active' : ''}`} />
          </label>
        </div>
      </section>

      {/* Theme color circle picker buttons */}
      <section className='settingsGroup'>
        <h3 className='groupTitle'>Accent Color</h3>
        <div className='settingsCard' style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px', cursor: 'default' }}>
          <p className="subtext" style={{ margin: 0 }}>Pick your primary highlighting color theme for links, buttons, and icons.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {colorOptions.map((color) => (
              <button
                key={color.id}
                onClick={() => setThemeColor(color.id)}
                title={color.name}
                type="button"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: color.value,
                  border: themeColor === color.id ? '3px solid var(--text-color, #000)' : '2px solid transparent',
                  cursor: 'pointer',
                  transform: themeColor === color.id ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.1s ease, border-color 0.1s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

