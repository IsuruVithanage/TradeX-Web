import React from 'react';
import "./AdminCard.css";

const AdminCard = ({ children }) => {
  return (
    <div className='card'>
      {children}
    </div>
  );
};

export default AdminCard;
