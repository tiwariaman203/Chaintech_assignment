import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState(user ? user.email : '');
  const [name, setName] = useState(user ? user.name : '');
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      //PUT request
      await axios.put(`http://localhost:5000/users/${user.id}`, {
        ...user,
        email,
        name
      });
      setUser({ ...user, email, name });
      alert('Account updated successfully!');
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Account Information</h2>
      {user ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit">Update</button>
        </form>
      ) : (
        <>
          <p>Please log in to view your account information.</p>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </>
      )}
    </div>
  );
};

export default Account;
