import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5050/createUser', { name, email, age })
      .then(() => navigate('/'))
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter age"
              className='form-control'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='btn btn-success'>Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
