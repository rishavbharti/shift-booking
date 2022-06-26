import React from 'react';
import clsx from 'clsx';

const Tab = (props) => {
  const { name, isActive } = props;

  return (
    <div
      className={clsx('text-mainText px-8 py-3 cursor-pointer', {
        'text-activeTabText': isActive,
      })}
    >
      {name}
    </div>
  );
};

export default Tab;
