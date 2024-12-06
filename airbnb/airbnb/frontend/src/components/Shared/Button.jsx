import React from 'react';

const Button = ({ onClick, children, className = '', ...props }) => (
  <button onClick={onClick} className={`button ${className}`} {...props}>
    {children}
  </button>
);

export default Button;