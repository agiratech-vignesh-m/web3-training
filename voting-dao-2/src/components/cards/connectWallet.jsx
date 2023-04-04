import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { initiateNetwork } from "../../integration/web3Client";
import { setWalletData, walletConnect } from "../../redux/counter/counterSlice";
import "./cards.scss";
import NetworkConnection from "../../helpers/networkConnection";

const ConnectWallet = ({ title, text }) => {
  const dispatch = useDispatch();
  const { autoConnect } = NetworkConnection();

  const disconnectNetwork = async () => {
    window.localStorage.removeItem("userAccount");
    dispatch(walletConnect(false));
  };
  return (
    <div className="connect-wallet">
      <h1 style={{ textAlign: "center" }}> {title} </h1>
      <div style={{ textAlign: "center" }}>
        <Button
          disableRipple
          className="btn-wallet"
          onClick={autoConnect}
        >
          {" "}
          Connect wallet{" "}
        </Button>
        <p> {text}</p>
      </div>
    </div>
  );
};

export default ConnectWallet;
