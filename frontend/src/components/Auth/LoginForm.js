import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';

function LoginForm({ onClose }) {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await dispatch(login({ credential, password }));
      onClose();
    } catch (res) {
      const data = await res.json();
      if (data.errors) setErrors(data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" disabled={credential.length < 4 || password.length < 6}>
        Log in
      </button>
    </form>
  );
}

export default LoginForm;