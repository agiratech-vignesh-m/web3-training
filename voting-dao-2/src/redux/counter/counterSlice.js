import { createSlice } from '@reduxjs/toolkit';
import data from '../../constant/list.json';
const initialState = {
  list: data.list,
  isWalletConnect: false,
  walletData: {},
  isConnectAMENetwork: false,
  isLoading: true
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
    setWalletDataBalance: (state, action) => {
      state.walletData.ameBalance = action.payload;
    },
    clearData: (state) => {
      state.walletData = {};
      state.isWalletConnect = false;
    },
    setConnectAMENetwork: (state, action) => {
      state.isConnectAMENetwork = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  }
});

export const { addList, walletConnect, setWalletData, setWalletDataBalance, clearData, setConnectAMENetwork, setLoading } = counterSlice.actions;

export const selectList = (state) => state.counter.list;
export const walletStatus = (state) => state.counter.isWalletConnect;
export const getWalletData = (state) => state.counter.walletData;
export const getisConnectAMENetwork = (state) => state.counter.isConnectAMENetwork;
export const getLoading = (state) => state.counter.isLoading;

export default counterSlice.reducer;
