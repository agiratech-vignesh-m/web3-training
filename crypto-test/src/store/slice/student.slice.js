import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentList: [],
};

const postsSlice = createSlice({
  name: "student",
  initialState: initialState,
  reducers: {
    listStudent: (state, action) => {
      state = Object.assign({}, state, { studentList: action.payload });
      return state;
    },
  },
});

const { actions, reducer } = postsSlice;

export const { listStudent } = actions;

export default reducer;
