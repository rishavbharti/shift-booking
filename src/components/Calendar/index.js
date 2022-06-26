import React, { useState } from 'react';

import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import Tabs from '../Tabs';
import Tab from '../Tab';
import AvailableShiftsTab from './components/AvailableShiftsTab';

const Calendar = (props) => {
  const { locations, dates, bookedShifts, availableShifts } = props;

  const shiftTabs = ['My shifts', 'Available shifts'];
  const [activeShiftTab, setActiveShiftTab] = useState(shiftTabs[1]);

  const renderShiftTabs = () => {
    const handleChange = (value) => {
      if (activeShiftTab !== value) {
        setActiveShiftTab(value);
      }
    };

    return (
      <Tabs tabSize='medium' onChange={handleChange}>
        {shiftTabs.map((shift, index) => (
          <Tab name={shift} key={index} isActive={activeShiftTab === shift} />
        ))}
      </Tabs>
    );
  };

  const renderTable = () => {
    if (activeShiftTab === 'Available shifts')
      return (
        <AvailableShiftsTab
          locations={availableShifts.locations}
          dates={availableShifts.dates}
          availableShifts={availableShifts}
        />
      );
  };

  const renderContent = () => {
    return (
      <div className='w-5/6 lg:w-1/2'>
        {renderShiftTabs()}
        <div className='border-2 border-borderTable rounded-md'>
          {renderTable()}
        </div>
      </div>
    );
  };

  return renderContent();
};

export default Calendar;
