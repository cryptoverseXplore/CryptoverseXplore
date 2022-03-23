import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../assets/Logo Cryptoplanet Xpress - sito.png";
import Home2 from "./Home2";

import { ethers } from 'ethers';
import contract from '../../contracts/CryptoverseXplore.json';
import React, { useState, useEffect } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const contractAddress = "0x5710100DCDC5d59F971C93489fbBB3287cE97EF4";
const abi = contract.abi;

function Home() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    }
    catch (err) {
      console.log(err)
    }
   }

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mint(1, { value: ethers.utils.parseEther("0.25")});

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log('Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}');
      }
      else{
        console.log("Ethereum object does not exist");
      }
    }
    catch (err) {
      console.log(err);
    }
   }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if(!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    }
    else{
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts'});

    if (accounts.length !== 0){
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    }
    else{
      console.log("No authorized account found");
    }
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <section>
      <div className="main-app"/>
        <Container className="home-content">
          <Row>
            <Col className="home-header">
              <h1 className="heading">
                Hi There!{" "}
              </h1>

              <h1 className="heading">
                <strong className="main-name"> MINT YOUR NFT!</strong>
              </h1>
              <div className="heading">
                {currentAccount ? mintNftButton() : connectWalletButton()}
              </div>
            </Col>
          </Row>
        </Container>
      <Home2 />
    </section>
  );
}

export default Home;
