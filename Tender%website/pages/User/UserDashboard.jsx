// src/pages/User/UserDashboard.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserProfile from './UserProfile';

const UserDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<UserProfile />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<Navigate to="/dashboard/profile" replace />} />
    </Routes>
  );
};

export default UserDashboard;
