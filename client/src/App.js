/* eslint-disable no-unused-vars */
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "../src/components/FileUpload";
import Modal from "../src/components/Modal";
import Display from "../src/components/Display";

import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
     
        await provider.send("eth_requestAccounts", []);

        /* here below window.ethereum.on .. we are doing this as part of our functionality like when we change 
        our wallet addresss in metamask then we need to reload to see changes so to avoid that.So when wallet address will change it will get reloaded */

        window.ethereum.on("accountsChanged",() =>
        {
          window.location.reload();
        })
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
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
    <div className="App">
    <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>

    <p style={{ color: "white" }}>
      Account : {account ? account : "Not connected"}
    </p>
    <FileUpload
      account={account}
      contract={contract}
    ></FileUpload>
    <Display contract={contract} account={account}></Display>
  </div>
   
    
  );
}

export default App;
