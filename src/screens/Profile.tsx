import React, { useEffect, useState } from 'react';
import "../style/profile.css"
import userPhoto from '../assets/UserIcon.png';
import { useGlobalContext } from '../GlobalContext';


const Profile = () => {
  //Using global variables
  const context = useGlobalContext();
  //If context missing throw error
  if (!context) {
    throw new Error("Profile component must be used within a GlobalsProvider");
  }

  const { user, setUser } = context;


  //Using structured interface above to manage component stage
  const [profileForm, setProfileForm] = useState({
    FirstName: '',
    LastName: '',
    Role: '',
    Email: '',
    MobilePhone: '',
    InternalPhone: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = `http://localhost:3000`;

  //Fetch DATA
  useEffect(() => {
    const currentUserId = user ? user.id : 1;

    fetch(`${API_URL}/users/${currentUserId}`)
      .then(res => {
        if (!res.ok) throw new Error("Couldn't fetch user data");
        return res.json();
      })
      .then(data => {
        setProfileForm({
          FirstName: data.FirstName || '',
          LastName: data.LastName || '',
          Role: data.Role || 'Operator',
          Email: data.Email || '',
          MobilePhone: data.MobilePhone?.toString() || '-',
          InternalPhone: data.InternalPhone?.toString() || '-'
        });

        if (!user) {
          setUser(data);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("Cannot connect to backend:", err);
        setLoading(false);
      });
  }, [user, setUser]);

  //Hangle typing changes in real-time
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSaveClick = async () => {
    if (isEditing) {
      const currentUserId = user ? user.id : 1;

      try {
        const response = await fetch(`${API_URL}/users/${currentUserId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            FirstName: profileForm.FirstName,
            LastName: profileForm.LastName,
            Role: profileForm.Role,
            Email: profileForm.Email,
            MobilePhone: profileForm.MobilePhone,
            InternalPhone: profileForm.InternalPhone,
          }),
        });

        if (!response.ok) throw new Error("Update to db failed");

        const updatedData = await response.json();
        setUser(updatedData);

        setIsEditing(false);
      } catch (error) {
        alert("Failed to save changes");
      }
    } else {
      setIsEditing(true);
    }
  };

  if(loading) return <div className='container'><main className='mainContent'>Connecting to context...</main></div>;

  return (
    <div className='container'>
      <main className='mainContent'>
        <section className='profileHeader'>
          <div className='avatarWrapper'>
            <img src={userPhoto} alt="Profile" className='profileImage' />
          </div>
          <div className='profileHeaderText'>
            <h2>{profileForm.FirstName} {profileForm.LastName}</h2>
            <p>{profileForm.Email}</p>
          </div>
        </section>

        <section className='infoSection'>
          <div className='sectionHeader'>
            <h3>General</h3>
            <button
              className='editBtn'
              onClick={handleEditSaveClick}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className='card'>
            <div className='row'>
              <span>Name:</span>
              {isEditing ? (
                <input name="FirstName" value={profileForm.FirstName} onChange={handleChange} />
              ) : (
                <span>{profileForm.FirstName}</span>
              )}
            </div>
            <div className='row'>
              <span>Lastname:</span>
              {isEditing ? (
                <input name="Lastname" value={profileForm.LastName} onChange={handleChange} />
              ) : (
                <span>{profileForm.LastName}</span>
              )}
            </div>
            <div className='row'>
              <span>Role:</span>
              {isEditing ? (
                <input name="Role" value={profileForm.Role} onChange={handleChange} />
              ) : (
                <span>{profileForm.Role}</span>
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
              <span>Mobile Phone:</span>
              {isEditing ? (
                <input name="MobilePhone" value={profileForm.MobilePhone} onChange={handleChange} />
              ) : (
                <span>{profileForm.MobilePhone}</span>
              )}
            </div>
            <div className='row'>
              <span>Internal Phone:</span>
              {isEditing ? (
                <input name="InternalPhone" value={profileForm.InternalPhone} onChange={handleChange} />
              ) : (
                <span>{profileForm.InternalPhone}</span>
              )}
            </div>
            <div className='row'>
              <span>Email:</span>
              {isEditing ? (
                <input name="Email" value={profileForm.Email} onChange={handleChange} />
              ) : (
                <span>{profileForm.Email}</span>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Profile;