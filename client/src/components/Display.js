import "./Display.css";
const Display = ({walletAddress,contract}) =>
{
  const getData = async() =>
  {
    try{
      let dataArray;
      console.log("test",walletAddress);
      dataArray = await contract.display(walletAddress);
      console.log(dataArray);
    }
    catch(error)
    {
      console.error(error);
      alert(error);
    }
  
  }
    return (
        <>
          <div className="image-list"></div>
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
}

export default Display;