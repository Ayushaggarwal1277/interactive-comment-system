import React from 'react';
import { Avatar } from '@mui/material';

/**
 * UserAvatar Component
 * Displays user avatar with fallback to initials
 * @param {Object} user - User object with name and avatar properties
 * @param {string} size - Size of avatar: 'small', 'medium', 'large'
 */
const UserAvatar = ({ user, size = 'medium' }) => {
  // Generate initials from user name
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Size mapping for avatar
  const sizeMap = {
    small: { width: 32, height: 32, fontSize: 14 },
    medium: { width: 40, height: 40, fontSize: 16 },
    large: { width: 56, height: 56, fontSize: 20 },
  };

  const dimensions = sizeMap[size] || sizeMap.medium;

  // Generate consistent color from username
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  return (
    <Avatar
      src={user?.avatar}
      alt={user?.name || 'User'}
      sx={{
        width: dimensions.width,
        height: dimensions.height,
        fontSize: dimensions.fontSize,
        bgcolor: user?.name ? stringToColor(user.name) : '#999',
      }}
    >
      {!user?.avatar && getInitials(user?.name)}
    </Avatar>
  );
};

export default UserAvatar;
