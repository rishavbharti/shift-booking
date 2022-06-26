import React, { useState } from 'react';
import Tab from '../Tab';
import Tabs from '../Tabs';

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

  const renderContent = () => {
    return renderShiftTabs();
  };

  return <div>{renderContent()}</div>;
};

export default Calendar;
