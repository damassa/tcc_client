import React from 'react';
import './style.css';

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, disabled, label = 'Carregar mais' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg font-medium uppercase cursor-pointer transition-shadow ${disabled ? 'bg-green-600 text-gray-950 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600 text-gray-950'}`}
    >
      {disabled ? 'Carregando...' : label}
    </button>
  );
};

export default Button;
