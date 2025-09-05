import React from 'react';
import './Button.css';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const buttonClass = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${disabled ? 'btn-disabled' : ''} 
    ${loading ? 'btn-loading' : ''} 
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      <span className={loading ? 'btn-text-hidden' : ''}>{children}</span>
    </button>
  );
};

export default Button;
