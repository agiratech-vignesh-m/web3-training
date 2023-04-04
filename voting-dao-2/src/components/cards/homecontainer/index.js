import React from "react";
import "./about.css";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";

const HomeContainer = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    maxWidth: "200px",
    boxShadow: "none",
    maxHeight: "140px",
    color: theme.palette.text.secondary,
  }));
  return (
    <div className="about">
     <Container>
        <div className="details">
          <h2>
            AME Chain is the world’s first and only Quantum secured
            decentralized digital asset ledger that is EVM compatible with high
            performance and scalability.
          </h2>
        </div>
        <div className="grid-data">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3}>
              <Item className="grid-data-item">
                <img
                  className="gridImage"
                  src="https://amechain.io/static/img-amechain/evm-compatible.png"
                  alt="image8"
                />
                <p className="gridDesc"> EVM Compatible </p>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Item className="grid-data-item">
                <img
                  className="gridImage"
                  src="https://amechain.io/static/img-amechain/smart-contracts.png"
                  alt="image7"
                />
                <p className="gridDesc">
                  Deploy Smart Contracts and Create Dapps
                </p>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Item className="grid-data-item">
                <img
                  className="gridImage"
                  src="https://amechain.io/static/img-amechain/tps.png"
                  alt="image6"
                />
                <p className="gridDesc">
                  High TPS than Ethereum & Binance Chain
                </p>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Item className="grid-data-item">
                <img
                  className="gridImage"
                  src="https://amechain.io/static/img-amechain/proof-authority.png"
                  alt="image5"
                />
                <p className="gridDesc">Proof-of-Authority & QBFT</p>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Item className="grid-data-item">
                <img
                  className="gridImage"
                  src="https://amechain.io/static/img-amechain/nft.png"
                  alt="image4"
                />
                <p className="gridDesc">Mint NFTs & Create Metaverse</p>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Item className="grid-data-item">
                <img
                  className="gridImage"
                  src="https://amechain.io/static/img-amechain/cross-link.png"
                  alt="image3"
                />
                <p className="gridDesc">Cross-Chain Transfer</p>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Item className="grid-data-item">
                <img
                  className="gridImage"
                  src="https://amechain.io/static/img-amechain/block-time.png"
                  alt="image3"
                />
                <p className="gridDesc">Block Time - 5 Seconds</p>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Item className="grid-data-item">
                <img
                  className="gridImage"
                  src="https://amechain.io/static/img-amechain/governance.png"
                  alt="image2"
                />
                <p className="gridDesc">Governance (Voting)</p>
              </Item>
            </Grid>
          </Grid>
        </div>
        </Container>
    </div>
  );
};

export default HomeContainer;
