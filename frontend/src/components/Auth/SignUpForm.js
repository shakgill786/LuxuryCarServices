import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/session';

function SignUpForm({ onClose }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (form.password !== form.confirmPassword) {
      setErrors(['Passwords must match']);
      return;
    }
    try {
      await dispatch(signUp(form));
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
      {['firstName', 'lastName', 'email', 'username', 'password', 'confirmPassword'].map(
        (field) => (
          <label key={field}>
            {field}
            <input
              type={field.includes('password') ? 'password' : 'text'}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </label>
        )
      )}
      <button
        type="submit"
        disabled={
          !form.firstName ||
          !form.lastName ||
          !form.email ||
          form.username.length < 4 ||
          form.password.length < 6 ||
          form.password !== form.confirmPassword
        }
      >
        Sign up
      </button>
    </form>
  );
}

export default SignUpForm;