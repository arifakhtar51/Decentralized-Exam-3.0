import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload=({ contract, account })=>{
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);
  
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `6be49e19e189e1d26709`,
              pinata_secret_api_key: `f4ee2e804f72bc67a7bebcf6d725e0104c3ff2a83d2d877454876e4c30defc83`,
              "Content-Type": "multipart/form-data",
            },
          });
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          contract.add(account,ImgHash);
          // const tx = await contract.add(account, ImgHash);
          // console.log("Transaction hash:", tx.hash);
          alert("Successfully Image Uploaded");
          setFileName("No image selected");
          setFile(null);
        } catch (e) {
          alert("Unable to upload image to Pinata");
        }
      }
      // alert("Successfully Image Uploaded");
      setFileName("No image selected");
      setFile(null);
    };
    const retrieveFile = (e) => {
      const data = e.target.files[0]; //files array of files object
      console.log(data);
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setFile(e.target.files[0]);
      };
      setFileName(e.target.files[0].name);
      e.preventDefault();
    };
    return <>
        <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
    </>;
};

export default FileUpload;