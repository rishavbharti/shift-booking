import React, { useState } from 'react';
import Tabs from '../../../Tabs';
import Tab from '../../../Tab';
import TableHeader from '../../../TableHeader';
import TableRow from '../../../TableRow';

const AvailableShiftsTab = (props) => {
  const { locations, dates, availableShifts } = props;
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

  const renderDate = (date) => {
    const renderDateHeader = () => <TableHeader title={date} />;

    const renderShifts = () => {
      return availableShifts[activeLocationTab][date].shifts.map(
        (shift, index) => (
          <TableRow
            title={`${shift.localStartTime} - ${shift.localEndTime}`}
            key={shift.id}
          />
        )
      );
    };

    return (
      <>
        {renderDateHeader()}
        {renderShifts()}
      </>
    );
  };

  const renderLocationContent = (location) => {
    if (availableShifts[activeLocationTab]) {
      return availableShifts[activeLocationTab].dates.map((date) =>
        renderDate(date)
      );
    }
  };

  return (
    <div>
      {renderLocationsTabs()}
      {renderLocationContent()}
    </div>
  );
};

export default AvailableShiftsTab;
