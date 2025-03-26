import "./FileUpload.css";
import { useState } from "react";
import axios from "axios";
const FileUpload = ({ walletAddress, contract }) => {
  // Handle image - to upload the image on ipfs
  // retrieve file
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No File or Folder Selected");
  const [fileOrFolder, setFileOrFolder] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const retrieve = (event) => {
    event.preventDefault();
    if (event?.target?.id === "folder-upload") {
      setFileOrFolder("FOLDER");
      console.log("Folder event", event.target.files[0]);
      setFileName(event.target.files[0]?.webkitRelativePath.split("/")[0]);
    } else {
      setFileOrFolder("FILE");
      const data = event.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setFile(data);
      };
      setFileName(event.target.files[0].name);
    }
    setBtnDisabled(false);
  };

  const handleSubmission = async () => {
    try {
      setBtnDisabled(true);
      const formData = new FormData();

      if (fileOrFolder === "FOLDER") {
        Array.from(fileName).forEach((file) => {
          formData.append("file", file);
        });
        const metadata = JSON.stringify({
          name: "File name",
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
          cidVersion: 0,
        });
        formData.append("pinataOptions", options);
      } else {
        if (file) {
          formData.append("file", file);
        }
      }

      const res = await axios({
        method: "post",
        url: process.env.REACT_APP_IPFS_URL,
        data: formData,
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY || "",
          pinata_secret_api_key:
            process.env.REACT_APP_PINATA_SECRET_API_KEY || "",
          "Content-Type": "multipart/form-data",
        },
      });
      const imgHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      console.log(imgHash); // This is the file link that we have uploaded
      await contract.add(walletAddress, imgHash);
      alert("Folder Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setBtnDisabled(false);
      setFileName("No File or Folder Selected");
    }
  };

  return (
    <div>
      <form className="form">
        <div className="upload-flex border">
          <h2>Upload data in IPFS</h2>
          <span className="choose-buttons">
            <label htmlFor="file-upload" className="choose">
              Choose File
            </label>
            <label htmlFor="folder-upload" className="choose">
              Choose Folder
            </label>
          </span>
          <input
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieve}
            disabled={!walletAddress}
          />
          <input
            id="folder-upload"
            directory=""
            webkitdirectory=""
            type="file"
            onChange={retrieve}
          />
          <span className="textArea">{fileName} </span>
          <button
            type="submit"
            className="upload"
            onClick={handleSubmission}
            disabled={btnDisabled}
          >
            Upload
          </button>
        </div>

        {/* <button type="submit" className="upload" onClick={handleSubmission}>
          Upload Folder
        </button> */}
      </form>
    </div>
  );
};
export default FileUpload;

// Pinnata fileUpoload jwt
/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmMzQyZDc5NS0wNmNkLTQyNmQtYjRmMS0zNWQxZGFmN2U0ZWQiLCJlbWFpbCI6InJpc2hhYm1laHRhMTI0ODBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjRkMTI4NDg0ZjNjZWUxN2VmMjAyIiwic2NvcGVkS2V5U2VjcmV0IjoiYzYwN2YxNThkM2IyYzA4YmU1YmUxM2YwNTAyNzdjZGMyYWMwOWEzNTE3NWEzNTA0YTlmMTc3MTEyMTJjZTRiNSIsImV4cCI6MTc2OTYwMDYxMH0.G0hUhwkDMynlOuY8GCWidnYiS7q4je9fqxmyjCqxwiQ*/
