import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import RealStateNFT from '../artifacts/contracts/RealStateNFT.sol/RealStateNFT.json';
import RealStateCoin from '../artifacts/contracts/RealStateCoin.sol/RealStateCoin.json';
import CustomNavBar from "./Navigation/CustomNavBar";
import DiscoverPage from "./Pages/DiscoverPage";
import MyNftsPage from "./Pages/MyNftsPage";
import RentPage from "./Pages/RentPage";

const RealStateNFTAbi = RealStateNFT.abi;
const RealStateNFTAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const RealStateCoinAbi = RealStateCoin.abi;

const web3 = new Web3("ws://localhost:8545")
const RealStateNFTContract = new web3.eth.Contract(RealStateNFTAbi, RealStateNFTAddress);

const App = () =>{
    
    const [getContractOwner, setContractOwner] = useState("");

    useEffect(() => {
        const fetchOwner = async () => {
            await fetchContractOwner();
        }

        fetchOwner().catch(console.error);
    }, []);

    const fetchContractOwner = async () => {
        const owner = await RealStateNFTContract.methods.owner().call();
        setContractOwner(owner);
    }

    RealStateNFTContract.events.NFTMinted()
        .on('data', event => console.log(event));

    return (
        <div>
            <CustomNavBar walletAddress = {getContractOwner}/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={
                        <DiscoverPage />
                    } />
                    <Route path='/mynfts' element={
                        <MyNftsPage />
                    } />
                    <Route path='/rent' element={
                        <RentPage />
                    } />
                </Routes>
            </BrowserRouter>
        </div>

    )
}

const createNewNFT = async () => {
    const result = await RealStateNFTContract.methods.createNFT(
        "uri",
        100,
        20,
        "MYCoin",
        "MYC"
    ).send({
        from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        value: web3.utils.toWei(0.5, 'ether')
    });
}

export default App