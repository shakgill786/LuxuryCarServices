import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function AuthModal({ show, onClose, type }) {
  if (!show) return null;

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {type === 'login' && <LoginForm onClose={onClose} />}
        {type === 'signup' && <SignUpForm onClose={onClose} />}
      </div>
    </div>
  );
}

export default AuthModal;