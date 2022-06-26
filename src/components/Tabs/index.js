import React from 'react';
import clsx from 'clsx';

const Tabs = (props) => {
  const { tabSize, onChange } = props;

  const handleClick = (e) => {
    onChange(e.target.textContent);
  };

  return (
    <div
      className={clsx('flex', { 'text-2xl': tabSize === 'medium' })}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Tabs;
