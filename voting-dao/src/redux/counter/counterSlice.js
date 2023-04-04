import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import data from '../../constant/list.json';
const initialState = {
  list: data.list,
  isWalletConnect: false,
  walletData: null,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addList: (state, action) => {
      state.list = [action.payload, ...state.list]
    },
    walletConnect: (state, action) => {
      state.isWalletConnect = action.payload
    },
    setWalletData: (state, action) => {
      state.walletData = action.payload;
      state.isWalletConnect = true;
    },
    clearData: (state) => {
      state.walletData = {};
      state.isWalletConnect = false;
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     });
  // },
});

export const { addList, walletConnect, setWalletData, clearData } = counterSlice.actions;

export const selectList = (state) => state.counter.list;
export const walletStatus = (state) => state.counter.isWalletConnect;
export const getWalletData = (state) => state.counter.walletData;

export default counterSlice.reducer;
