import React, { useState } from 'react';
import { HomeIcon, BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';
import { useAuthStore } from '../store/authUser';
import ProfilePictureUploader from './ProfilePictureUploader';
// Zustand store

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); // Access user and logout

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <header className="topbar">
        <h1 className="header-title">Discover the Best Furniture</h1>
        <div className="icons">
          <HomeIcon className="icon" onClick={() => navigate('/')} />
          <BellIcon className="icon" onClick={() => navigate('/notification')} />
          <Bars3Icon className="icon" onClick={() => setMenuOpen(true)} />
        </div>
      </header>

      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="close-x" onClick={() => setMenuOpen(false)}>×</div>

        <div className="sidebar-header">
          <ProfilePictureUploader />
          <p><strong>Hello{user ? `, ${user.name || 'User'}` : ''}!</strong></p>

        </div>

        {user ? (<><button onClick={() => { setMenuOpen(false); navigate('/profile'); }}>My Profile</button>
          <button onClick={() => { setMenuOpen(false); navigate('/category'); }}>Categories</button>
          <button onClick={() => { setMenuOpen(false); navigate('/cart'); }}>My Cart</button>
          <button onClick={() => { setMenuOpen(false); navigate('/favorite'); }}>Favorite</button></>)
          : (<button onClick={() => { setMenuOpen(false); navigate('/login'); }}>Login</button>)}


        {user && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
    </div>
  );
}
