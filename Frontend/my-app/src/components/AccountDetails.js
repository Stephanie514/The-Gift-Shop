// src/components/AccountDetails.js
import React from 'react';

const AccountDetails = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Account Details</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default AccountDetails;
