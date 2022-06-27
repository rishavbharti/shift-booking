import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '../../../Tabs';
import Tab from '../../../Tab';
import TableHeader from '../../../TableHeader';
import TableRow from '../../../TableRow';

import { SHIFT_STATUS } from '../../../../constants';
import { bookShift } from 'app/slice/shiftsSlice';

const AvailableShiftsTab = (props) => {
  const { locations, availableShifts } = props;
  const dispatch = useDispatch();
  const [activeLocationTab, setActiveLocationTab] = useState(locations[0]);

  const renderLocationsTabs = () => {
    const handleChange = (value) => {
      if (activeLocationTab !== value) {
        setActiveLocationTab(value);
      }
    };

    return (
      <Tabs onChange={handleChange}>
        {locations.map((location, index) => (
          <Tab
            name={location}
            key={index}
            isActive={activeLocationTab === location}
          />
        ))}
      </Tabs>
    );
  };

  const handleClick = (location, date, index, id, booked, isOverlapping) => {
    dispatch(bookShift({ location, date, index, id }));
  };

  const renderDateAndShifts = (date) => {
    const renderDate = () => <TableHeader title={date} />;

    const renderShifts = () => {
      const shifts = availableShifts[activeLocationTab][date].shifts;

      return shifts.map((shift, index) => {
        let isOverlapping;
        if (
          (shifts?.[index - 1]?.booked &&
            shift.startTime <= shifts?.[index - 1]?.endTime) ||
          (shifts?.[index + 1]?.booked &&
            shift.endTime >= shifts?.[index + 1]?.startTime)
        ) {
          isOverlapping = true;
        }

        const { status, label, variant } = (function () {
          if (shift.booked) {
            return {
              status: SHIFT_STATUS.BOOKED,
              label: 'Cancel',
              variant: 'alert',
            };
          } else {
            return {
              status: isOverlapping ? SHIFT_STATUS.OVERLAP : '',
              label: 'Book',
              variant: 'success',
            };
          }
        })();

        return (
          <TableRow
            title={`${shift.localStartTime} - ${shift.localEndTime}`}
            key={shift.id}
            status={status}
            ctaLabel={label}
            ctaVariant={variant}
            disabled={shift?.loading || isOverlapping || shift.elapsed}
            onClick={handleClick.bind(
              this,
              shift.area,
              date,
              index,
              shift.id,
              shift.booked,
              isOverlapping
            )}
          />
        );
      });
    };

    return (
      <>
        {renderDate()}
        <ul>{renderShifts()}</ul>
      </>
    );
  };

  const renderLocationContent = () => {
    if (availableShifts[activeLocationTab]) {
      return availableShifts[activeLocationTab].dates.map((date) =>
        renderDateAndShifts(date)
      );
    }
  };

  return (
    <>
      {renderLocationsTabs()}
      {renderLocationContent()}
    </>
  );
};

export default AvailableShiftsTab;
