import "./FileUpload.css";
import { useState } from "react";
import axios from "axios";
const FileUpload = ({walletAddress,contract}) =>
{

    // Handle image - to upload the image on ipfs
    // retrieve file
    const [file,setFile] = useState(null);
    const [fileName,setFileName] = useState(null);

    const retrieveFile = (event) =>
    {
        const data = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () =>
        {
            setFile(data);
        }
        setFileName(event.target.files[0].name);
        event.preventDefault();

    }

    const handleSubmit = async(event) =>
    {
        event.preventDefault();
        if(file){
            try{
                const formData = new FormData();
                formData.append("file",file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                      pinata_api_key: `4d128484f3cee17ef202`,
                      pinata_secret_api_key: `c607f158d3b2c08be5be13f050277cdc2ac09a35175a3504a9f17711212ce4b5`,
                      "Content-Type": "multipart/form-data",
                    },
                  });
                  // Here we are hitting the pinata server and uploading the file and in return in 
                  // resFile.data.IpfsHash we are getting the cid(Content IDentifier)

                  const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                  console.log(imgHash); // This is the file link that we have uploaded
                  contract.add(walletAddress,imgHash); // Here we calling our function add in our smart contract by using 
                  //the contract instance that we created in our app.js
                  alert("Image Uploaded Successfully");
                  setFileName("No File Selected");
                  setFile(null);
            }
            catch(error)
            {
                alert(error);
            }
        }
    }
    return (
        <div className="top">
          <form className="form" onSubmit={handleSubmit} >
            <label htmlFor="file-upload" className="choose">
              Choose Image
            </label>
            <input
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
              disabled={!walletAddress}
            />
            <span className="textArea">Image:{fileName} </span>
            <button type="submit" className="upload" onClick={handleSubmit} disabled={!file}>
              Upload File
            </button>
          </form>
        </div>
      );
}
export default FileUpload;


// Pinnata fileUpoload jwt  
/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmMzQyZDc5NS0wNmNkLTQyNmQtYjRmMS0zNWQxZGFmN2U0ZWQiLCJlbWFpbCI6InJpc2hhYm1laHRhMTI0ODBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjRkMTI4NDg0ZjNjZWUxN2VmMjAyIiwic2NvcGVkS2V5U2VjcmV0IjoiYzYwN2YxNThkM2IyYzA4YmU1YmUxM2YwNTAyNzdjZGMyYWMwOWEzNTE3NWEzNTA0YTlmMTc3MTEyMTJjZTRiNSIsImV4cCI6MTc2OTYwMDYxMH0.G0hUhwkDMynlOuY8GCWidnYiS7q4je9fqxmyjCqxwiQ*/