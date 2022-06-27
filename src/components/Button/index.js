import React from 'react';
import clsx from 'clsx';

const Button = (props) => {
  const varaints = {
    SUCCESS: 'success',
    ALERT: 'alert',
  };
  const { label, variant, disabled, loading, onClick } = props;

  return (
    <button
      className={clsx('rounded-full px-8 py-1 border', {
        'text-confirmText border-confirmText': variant === varaints.SUCCESS,
        'text-alertText border-alertText': variant === varaints.ALERT,
        'animate-pulse text-2xl font-extrabold': loading,
      })}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? '...' : label}
    </button>
  );
};

export default Button;
