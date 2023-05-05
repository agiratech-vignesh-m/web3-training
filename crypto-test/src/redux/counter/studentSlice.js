import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: {}
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setStudentInfo: (state, action) => {
        console.log("acction", action)
      state = Object.assign({}, state, { info: action.payload })
    },
  }
});

export const { setStudentInfo } = studentSlice.actions;

export const studentInfo = (state) => state.student.info;

export default studentSlice.reducer;
