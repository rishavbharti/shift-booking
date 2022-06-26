import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Calendar from '../../components/Calendar';

import { getAllShifts } from '../../app/slice/shiftsSlice';

const Shifts = () => {
  const dispatch = useDispatch();
  const {
    status: { loading, error, errorMessage },
    locations,
    dates,
    bookedShifts,
    availableShifts,
  } = useSelector((state) => state.shifts);

  useEffect(() => {
    dispatch(getAllShifts());
  }, [dispatch]);

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;

    if (error) return <p>{errorMessage}</p>;

    return (
      <Calendar
        locations={locations}
        dates={dates}
        bookedShifts={bookedShifts}
        availableShifts={availableShifts}
      />
    );
  };

  return <div className='grid place-items-center m-20'>{renderContent()}</div>;
};

export default Shifts;
