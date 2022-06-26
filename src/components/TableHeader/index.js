import React from 'react';

const TableHeader = (props) => {
  const { title, subTitle } = props;

  return (
    <div className='flex items-center gap-6 px-6 py-3 border-b border-borderRow bg-headerBg'>
      <p className='text-xl font-medium text-headingText'>{title}</p>
      <p className='text-labelText'>{subTitle}</p>
    </div>
  );
};

export default TableHeader;
