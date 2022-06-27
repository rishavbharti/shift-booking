import React from 'react';
import { useDispatch } from 'react-redux';

import TableHeader from 'components/TableHeader';
import TableRow from 'components/TableRow';

import { BUTTON_VARIANTS } from '../../../../constants';

const MyShiftsTab = (props) => {
  const { bookedShifts, dates } = props;
  const dispatch = useDispatch();

  const handleClick = (location, date, index, id) => {
    console.log(location, date, index, id);
    // dispatch(cancelShift({ location, date, index, id }));
  };

  const renderDateAndShifts = (date) => {
    const renderDateHeader = () => <TableHeader title={date} />;

    const renderShifts = () => {
      return bookedShifts[date].shifts.map((shift, index) => {
        return (
          <TableRow
            title={`${shift.localStartTime} - ${shift.localEndTime}`}
            subTitle={shift.area}
            key={shift.id}
            ctaLabel='Cancel'
            ctaVariant={BUTTON_VARIANTS.ALERT}
            disabled={shift?.loading || shift.elapsed}
            onClick={handleClick.bind(
              this,
              shift.area,
              date,
              index,
              shift.id,
              shift.booked
            )}
          />
        );
      });
    };

    return (
      <>
        {renderDateHeader()}
        {renderShifts()}
      </>
    );
  };

  const renderContent = () => {
    if (!bookedShifts.all.length) return <p>Nothing here!</p>;

    return <ul>{dates.map((date) => renderDateAndShifts(date))}</ul>;
  };

  return renderContent();
};

export default MyShiftsTab;
