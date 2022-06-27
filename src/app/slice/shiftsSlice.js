import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  getMonthAndDate,
  getTimeInHoursMinutes,
  getTodayDate,
  getTomorrowDate,
} from '../../utilities';

const BASE_URL = 'http://127.0.0.1:8080';

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(getAllShifts(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const getAllShifts = createAsyncThunk(
  'shifts/getAllShifts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/shifts`);

      return { shifts: response.data };
    } catch (error) {
      console.error(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(...error.response.data.errors);
    }
  }
);

export const bookShift = createAsyncThunk(
  'shifts/bookShift',
  async ({ location, date, index, id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/shifts/${id}/book`);

      return { location, date, index };
    } catch (error) {
      console.error(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(...error.response.data.errors);
    }
  }
);

export const shiftsSlice = createSlice({
  name: 'shifts',
  initialState: {
    // locations: [],
    shiftStatus: {
      // [id]: {
      //   loading: true,
      //   error: false,
      // },
    },

    bookedShifts: {
      all: [],
      dates: [],
      locations: [],
      // [date]: {
      //   date: '',
      //   count: 0,
      //   duration: '',
      //   shifts: [{ location: '', startTime: '', endTime: '', booked: '' }],
      // },
    },

    availableShifts: {
      all: [],
      dates: [],
      locations: [],
      // [location]: {
      //   dates: [],
      //   count: 0,
      //   date1: {
      //     date: '',
      //     count: 0,
      //     shifts: [{ location: '', startTime: '', endTime: '', booked: '' }],
      //   },
      // },
    },

    status: {
      loading: false,
      error: false,
      errorMessage: null,
    },
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAllShifts.pending, (state) => {
        state.status.loading = true;
      })
      .addCase(getAllShifts.fulfilled, (state, action) => {
        const { shifts } = action.payload;

        shifts.sort((a, b) => a.startTime - b.startTime);

        const today = getTodayDate();
        const tomorrow = getTomorrowDate();
        const now = new Date();

        shifts.forEach((shift, index) => {
          const shiftDate = getMonthAndDate(shift.startTime);

          const startTime = getTimeInHoursMinutes(shift.startTime);
          const endTime = getTimeInHoursMinutes(shift.endTime);

          const location = shift.area;

          const _shift = {
            ...shift,
            elapsed: shift.startTime <= now,
            overlapping: false,
            localStartTime: startTime,
            localEndTime: endTime,
          };

          // state.dates = [...new Set([...state.dates, shiftDate])];
          // state.locations = [...new Set([...state.locations, location])];

          // If shift is not booked
          {
            state.availableShifts.all.push(_shift);
            state.availableShifts.dates = [
              ...new Set([...state.availableShifts.dates, shiftDate]),
            ];
            state.availableShifts.locations = [
              ...new Set([...state.availableShifts.locations, location]),
            ];

            const locationInAvailableShifts = state.availableShifts[location];

            // If location is not present in `availableShifts` state object
            if (locationInAvailableShifts) {
              state.availableShifts[location].dates = [
                ...new Set([...locationInAvailableShifts.dates, shiftDate]),
              ];
              state.availableShifts[location].count++;

              const dateInAvailableShifts =
                state.availableShifts[location][shiftDate];

              if (dateInAvailableShifts) {
                state.availableShifts[location][shiftDate].count++;
                state.availableShifts[location][shiftDate].shifts.push(_shift);
              } else {
                state.availableShifts[location] = {
                  ...state.availableShifts[location],
                  [shiftDate]: {
                    count: 1,
                    shifts: [_shift],
                  },
                };
              }
            } else {
              state.availableShifts = {
                ...state.availableShifts,
                [location]: {
                  dates: [shiftDate],
                  count: 1,
                  [shiftDate]: {
                    count: 1,
                    shifts: [_shift],
                  },
                },
              };
            }
          }

          // If shift is booked
          if (shift.booked) {
            state.bookedShifts.all.push(_shift);
            state.bookedShifts.dates = [
              ...new Set([...state.bookedShifts.dates, shiftDate]),
            ];
            state.bookedShifts.locations = [
              ...new Set([...state.bookedShifts.locations, location]),
            ];

            const dateInBookedShifts = state.bookedShifts[shiftDate];

            // If date exists in 'bookedShifts' state object
            if (dateInBookedShifts) {
              state.bookedShifts[shiftDate].count++;
              state.bookedShifts[shiftDate].shifts.push(_shift);

              // To do: Add duration
            }
            // If date is not in 'bookedShifts' state object
            else {
              state.bookedShifts = {
                ...state.bookedShifts,
                [shiftDate]: {
                  count: 1,
                  duration: '',
                  shifts: [_shift],
                },
              };
            }
          }
        });

        state.status.loading = false;
        state.status.error = false;
      })
      .addCase(getAllShifts.rejected, (state, action) => {
        state.status.loading = false;
        state.status.error = true;
        state.status.errorMessage =
          action?.payload || 'Something went wrong while fetching data';
      })

      .addCase(bookShift.pending, (state, action) => {
        const {
          meta: {
            arg: { location, date, index },
          },
        } = action;

        state.availableShifts[location][date].shifts[index] = {
          ...state.availableShifts[location][date].shifts[index],
          loading: true,
        };
      })
      .addCase(bookShift.fulfilled, (state, action) => {
        const {
          payload: { location, date, index },
        } = action;

        state.availableShifts[location][date].shifts[index] = {
          ...state.availableShifts[location][date].shifts[index],
          booked: true,
          loading: false,
        };
      })
      .addCase(bookShift.rejected, (state, action) => {
        const {
          payload: { location, date, index },
        } = action;

        state.availableShifts[location][date].shifts[index] = {
          ...state.availableShifts[location][date].shifts[index],
          loading: false,
        };
      });
  },
});

export default shiftsSlice.reducer;
