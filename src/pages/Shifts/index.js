import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Calendar from '../../components/Calendar';

import { getAllShifts } from '../../app/slice/shiftsSlice';

const Shifts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShifts());
  }, [dispatch]);

  return (
    <div className='grid place-items-center m-20'>
      <Calendar />
    </div>
  );
};

export default Shifts;
