import "./Display.css";
import { useState } from "react";

const Display = ({ walletAddress, contract }) => {
  const [data, setData] = useState();
  const getData = async () => {
    let dataArray;
    let otherAddress = document.querySelector(".address").value;
    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
      } else {
        dataArray = await contract.display(walletAddress);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
    const isEmpty = Object.keys(dataArray).length === 0;
    if (!isEmpty) {
      const images = dataArray.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank" rel="noreferrer">
            <img src={item} key={`img-${i}`} alt="new" className="image-list" />
          </a>
        );
      });
      setData(images);
    } else {
      setData("No Images to display");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};

export default Display;
