import React, { useState, useEffect } from "react";

const DisplayImages = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [accAddress, setAccAddress] = useState(null);
  const [empty, setEmpty] = useState(true);
  const [images, setImages] = useState([]);
  
  const getdata = async () => {
    let dataArray;
    const Otheraddress = accAddress;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        setData(dataArray);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account.address);
        console.log(dataArray);
        setData(dataArray);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = dataArray.length === 0;
    // console.log(isEmpty);
    setEmpty(isEmpty);
    setImages(dataArray);
  };

  return (
    <div className="mt-8">
        
      {empty ? (
        " "
      ) : (
        <div className="mt-8 flex flex-wrap m-auto">
          {images.map((image, i) => (
            <div className="p-8 m-4 h-60 w-3/12">
              <img src={image} alt="New image" />
            </div>
          ))}
        </div>
      )}
      <label
        className="block mb-2 text-sm font-medium text-gray-900 text-center mt-8"
        for="file_input"
      >
        Display All Images
      </label>
      <input
        className="drop-shadow-lg block text-sm text-gray-900 border p-2 border-gray-300 w-3/6 m-auto rounded-lg cursor-pointer bg-gray-50 focus:outline-none  p-1"
        id="address"
        type="text"
        placeholder="Enter Address"
        onChange={(event) => setAccAddress(event.target.value)}
      />
      <div className="drop-shadow-lg flex flex-col w-24 m-auto mt-4">
        <button
          type="button"
          className="text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={getdata}
        >
          Display
        </button>
      </div>
    </div>
  );
};

export default DisplayImages;
