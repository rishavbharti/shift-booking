import React, { useState } from 'react';

import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import AvailableShiftsTab from './components/AvailableShiftsTab';
import MyShiftsTab from './components/MyShiftsTab';

import { SHIFT_TABS } from 'constants';

const Calendar = (props) => {
  const { bookedShifts, availableShifts } = props;

  const shiftTabs = Object.values(SHIFT_TABS);
  const [activeShiftTab, setActiveShiftTab] = useState(shiftTabs[0]);

  const handleChange = (value) => {
    if (activeShiftTab !== value) {
      setActiveShiftTab(value);
    }
  };

  const renderShiftTabs = () => {
    return (
      <Tabs tabSize='medium' onChange={handleChange}>
        {shiftTabs.map((shift, index) => (
          <Tab name={shift} key={index} isActive={activeShiftTab === shift} />
        ))}
      </Tabs>
    );
  };

  const renderTable = () => {
    switch (activeShiftTab) {
      case SHIFT_TABS.AVAILABLE:
        return (
          <AvailableShiftsTab
            locations={availableShifts.locations}
            dates={availableShifts.dates}
            availableShifts={availableShifts}
          />
        );

      case SHIFT_TABS.BOOKED:
        return (
          <MyShiftsTab
            locations={bookedShifts.locations}
            dates={bookedShifts.dates}
            bookedShifts={bookedShifts}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className='w-5/6 lg:w-1/2'>
      {renderShiftTabs()}
      <div className='border-2 border-borderTable rounded-md'>
        {renderTable()}
      </div>
    </div>
  );
};

export default Calendar;
