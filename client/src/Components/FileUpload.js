// require('dotenv').config();
import React, { useState } from "react";
import axios from "axios";


const FileUpload = (props) => {
  const [file, setFile] = useState(null);
  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
  };

  const uploadData = async (event) => {
    await event.preventDefault();
    const formData = new FormData();
    if (file) {
      try {     
        formData.append("file", file);
      } catch (e) {
        console.error(e);
      }
    }

    const resFile = await axios({
      method: "POST",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: process.env.REACT_APP_pinata_key,
        pinata_secret_api_key: process.env.REACT_APP_pinata_secrete_key,
        "Content-Type": "multipart/form-data",
      },
    });
    const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
    console.log(ImgHash);
    await props.UploadFile(ImgHash);
  }


  return (
    <div className="mt-8">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 text-center"
        for="file_input"
      >
        Upload file 
      </label>
      <input
        className="drop-shadow-lg block text-sm p-2 text-gray-900 border border-gray-300 w-3/6 m-auto rounded-lg cursor-pointer bg-gray-50 focus:outline-none  p-1"
        id="file_input"
        type="file"
        onChange={handleFileChange}
      />
      <div className=" flex flex-col w-24 m-auto mt-4">
        <button
          type="button"
          className="drop-shadow-lg text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={uploadData}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
