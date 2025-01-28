import "./Display.css";
const Display = () =>
{
    return (
        <>
          <div className="image-list"></div>
          <input
            type="text"
            placeholder="Enter Address"
            className="address"
          ></input>
          <button className="center button" >
            Get Data
          </button>
        </>
      );
}

export default Display;