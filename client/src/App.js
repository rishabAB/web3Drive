/* eslint-disable no-unused-vars */
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "../src/components/FileUpload";
import Modal from "../src/components/Modal";
import Display from "../src/components/Display";

import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        // In this line we are connecting and asking for permission from metamask
        await provider.send("eth_requestAccounts", []);

        /* here below window.ethereum.on .. we are doing this as part of our functionality like when we change 
        our wallet addresss in metamask then we need to reload to see changes so to avoid that.So when wallet address will change it will get reloaded */

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
      <div className="App">
        <h1>IPFS Storage Dapp</h1>

        <p style={{"color":"white","lineHeight":"1.5"}}>
          This is an IPFS storage platform where you can upload virtually any
          type of file, including images, videos, documents, and more upto a
          limit of 25GB. You can also share/unshare your files to a wallet
          address.
        </p>

        <p>
          Account : {walletAddress ? walletAddress : "Not connected"}
        </p>
        <FileUpload
          walletAddress={walletAddress}
          contract={contract}
        ></FileUpload>
        <Display walletAddress={walletAddress} contract={contract}></Display>
      </div>
    </>
  );
}

export default App;
