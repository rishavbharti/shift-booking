import React from 'react';
import clsx from 'clsx';

import { BUTTON_VARIANTS } from '../../constants';

const Button = (props) => {
  const { label, variant, disabled, loading, onClick } = props;

  return (
    <button
      className={clsx('rounded-full px-8 py-1 border', {
        'text-confirmText border-confirmText':
          variant === BUTTON_VARIANTS.SUCCESS,
        'text-confirmTextFaded border-confirmTextFaded':
          variant === BUTTON_VARIANTS.SUCCESS && disabled,

        'text-alertText border-alertText': variant === BUTTON_VARIANTS.ALERT,
        'text-alertTextFaded border-alertTextFaded':
          variant === BUTTON_VARIANTS.ALERT && disabled,

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
