import React from 'react';

const TableRow = (props) => {
  const { title, subTitle } = props;

  return (
    <div className='flex items-center justify-between px-6 py-3 border-b border-borderRow'>
      <div className='flex flex-col gap-1'>
        <p className='text-headingText'>{title}</p>
        <p className='text-labelText text-sm'>{subTitle}</p>
      </div>
    </div>
  );
};

export default TableRow;
