// src/context/UserProvider.js
import React, { useState } from 'react';
import UserContext from './UserContext.jsx';

const UserProvider = ({ children }) => {
  const [masssage, setMassage] = useState('');
   const [messageInput, setMessageInput] = useState("");

  return (
    <UserContext.Provider value={{ masssage, setMassage ,setMessageInput ,messageInput }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
