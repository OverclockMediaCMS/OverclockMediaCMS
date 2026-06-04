import React, { useState } from 'react';
import "../style/profile.css"
import userPhoto from '../assets/UserIcon.png';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Lorem Ipsum',
    lastname: 'Ipsum',
    role: 'Operator',
    about: '-',
    phone: '-',
    email: 'Lorem@overclockmedia.com',
    internalPhone: '-'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className='container'>
      <main className='mainContent'>
        <section className='profileHeader'>
          <div className='avatarWrapper'>
            <img src={userPhoto} alt="Profile" className='profileImage'/>
          </div>
          <div className='profileHeaderText'>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>
        </section>
        
        <section className='infoSection'>
          <div className='sectionHeader'>
            <h3>General</h3>
            <button 
              className='editBtn' 
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          
          <div className='card'>
            <div className='row'>
              <span>Name:</span>
              {isEditing ? (
                <input name="name" value={profile.name} onChange={handleChange} />
              ) : (
                <span>{profile.name}</span>
              )}
            </div>
            <div className='row'>
              <span>Lastname:</span>
              {isEditing ? (
                <input name="lastname" value={profile.lastname} onChange={handleChange} />
              ) : (
                <span>{profile.lastname}</span>
              )}
            </div>
            <div className='row'>
              <span>Role:</span>
              {isEditing ? (
                <input name="role" value={profile.role} onChange={handleChange} />
              ) : (
                <span>{profile.role}</span>
              )}
            </div>
            <div className='row'><span>Number of Post:</span><span>20</span></div>
            <div className='row'><span>Media upload:</span><span>500</span></div>
          </div>
        </section>

        <section className='infoSection'>
          <div className='sectionHeader'>
            <h3>Contact</h3>
          </div>
          <div className='card'>
            <div className='row'>
              <span>Phone:</span>
              {isEditing ? (
                <input name="phone" value={profile.phone} onChange={handleChange} />
              ) : (
                <span>{profile.phone}</span>
              )}
            </div>
            <div className='row'>
              <span>Email:</span>
              {isEditing ? (
                <input name="email" value={profile.email} onChange={handleChange} />
              ) : (
                <span>{profile.email}</span>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Profile;