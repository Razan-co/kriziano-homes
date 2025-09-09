import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft,FaSearch } from 'react-icons/fa';
import '../css/Notification.css';
import { BellIcon } from '@heroicons/react/24/outline';

const notifications = [
  {
    id: 1,
    image: "/assets/item1.png",
    title: "Your order #123456789 has been confirmed",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.",
    label: null
  },
  {
    id: 2,
    image: "/assets/item2.png",
    title: "Your order #123456789 has been canceled",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.",
    label: "New"
  },
  {
    id: 3,
    image: null,
    title: "Discover hot sale furnitures this week.",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec.",
    label: "HOT!"
  },
  {
    id: 4,
    image: "/assets/item3.png",
    title: "Your order #123456789 has been confirmed",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.",
    label: null
  },
  {
    id: 5,
    image: "/assets/item4.png",
    title: "Your order #123456789 has been confirmed",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.",
    label: null
  },
  {
    id: 6,
    image: "/assets/item3.png",
    title: "Your order #123456789 has been confirmed",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.",
    label: null
  }
];


export default function Notification() {
    const navigate = useNavigate();
  return (
  <div className="notification-wrapper">
    <span className="back-arrow" onClick={() => navigate(-1)}>
  <FaChevronLeft size={20} />
</span>

    <div className="notification-header">
          <BellIcon className="icon" />
      <h2 className="notification-title">Notification</h2>
    </div>

      {notifications.map(note => (
        <div className={`notification-card ${!note.image ? 'full-width' : ''}`} key={note.id}>
          {note.image && <img src={note.image} alt="notification" className="notify-img" />}
          <div className="notify-text">
            <p className="notify-title"><strong>{note.title}</strong></p>
            <p className="notify-msg">{note.message}</p>
            {note.label && (
              <span className={`notify-label ${note.label === 'HOT!' ? 'hot' : 'new'}`}>
                {note.label}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}