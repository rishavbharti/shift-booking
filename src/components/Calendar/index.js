import React, { useState } from 'react';

import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import Tabs from '../Tabs';
import Tab from '../Tab';

const Calendar = () => {
  const shiftTabs = ['My shifts', 'Available shifts'];
  const [activeShiftTab, setActiveShiftTab] = useState(shiftTabs[0]);

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
    return (
      <>
        <TableHeader title='Today' subTitle='2 shifts, 4 h' />
        <TableRow title='12:00 - 14:00' subTitle='Helsinki' />
        <TableRow title='14:00 - 15:00' subTitle='London' />
      </>
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
