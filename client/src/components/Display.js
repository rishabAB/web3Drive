import "./Display.css";
import { useEffect, useState } from "react";
import Table from "./Table"
const Display = ({ walletAddress, contract }) => {
  const [data, setData] = useState(null);
 
  const getData = async () => {
    let dataArray;
    let otherAddress = document.querySelector(".address").value;
    try {
      if(!contract)
        return;
      dataArray = otherAddress ? await contract.display(otherAddress) : await contract.display(walletAddress);
      setData(dataArray);
     
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() =>
  {
    getData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[walletAddress,contract])

  return (
    <>
   { data ? <Table dataArray={data}/> : null}
      {/* <div className="image-list">{data}</div> */}
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      {/* <button className="center button" onClick={getData}>
        Get Data
      </button> */}
    </>
  );
};

export default Display;
