import React, { useRef, useState } from 'react';

import toast from 'react-hot-toast';
import { FaCamera } from 'react-icons/fa';
import { useAuthStore } from '../store/authUser';

export default function ProfilePictureUploader() {
  const { user, setUser } = useAuthStore();
  const defaultAvatar = '/assets/profile image.jpg';

  const [preview, setPreview] = useState(user?.avatar || defaultAvatar);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      await new Promise((res) => setTimeout(res, 1000));
      const fakeAvatarUrl = localUrl;
      setUser({ ...user, avatar: fakeAvatarUrl });
      toast.success('Profile picture updated (dummy)');
    } catch (err) {
      console.error('Dummy upload failed', err);
      toast.error('Dummy upload failed');
    }
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center', marginTop: '1rem' }}>
      <img
        src={preview || defaultAvatar}
        alt="Profile"
        onClick={() => fileInputRef.current.click()}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          objectFit: 'cover',
          cursor: 'pointer',
          border: '2px solid #ccc',
          backgroundColor: '#f2f2f2',
        }}
      />
      <FaCamera
        onClick={() => fileInputRef.current.click()}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 'calc(50% - 60px + 10px)',
          background: '#fff',
          borderRadius: '50%',
          padding: 5,
          fontSize: 18,
          cursor: 'pointer',
          boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        }}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
