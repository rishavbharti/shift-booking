import React from 'react';
import Button from '../Button';

const TableRow = (props) => {
  const {
    title,
    subTitle,
    status,
    ctaLabel,
    ctaVariant,
    disabled,
    loading,
    onClick,
  } = props;

  const renderStatusAndCTA = () => {
    if (!status && !ctaLabel) return null;

    return (
      <div className='flex items-center gap-8'>
        {status && <p className='text-sm'>{status}</p>}
        {ctaLabel && (
          <Button
            label={ctaLabel}
            variant={ctaVariant}
            disabled={disabled}
            loading={loading}
            onClick={onClick}
          />
        )}
      </div>
    );
  };

  return (
    <li className='flex items-center justify-between px-6 py-3 border-b border-borderRow'>
      <div className='flex flex-col gap-1'>
        <p className='text-headingText'>{title}</p>
        <p className='text-labelText text-sm'>{subTitle}</p>
      </div>
      {renderStatusAndCTA()}
    </li>
  );
};

export default TableRow;
