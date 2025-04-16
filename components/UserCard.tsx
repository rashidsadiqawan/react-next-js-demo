import React from 'react';
import './UserCard.css';

interface UserCardProps {
  name: string;
  email: string;
  avatarUrl: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, avatarUrl }) => {
  return (
    <div className="user-card">
      <img src={avatarUrl} alt={`${name}'s avatar`} className="user-avatar" />
      <div className="user-info">
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default UserCard;
