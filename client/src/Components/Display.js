import React from "react";
import FileUpload from "./FileUpload";
import DisplayImages from "./DisplayImages";

const Display = (props) => {
  return (
  <>
    <FileUpload UploadFile={props.UploadFile}/>
    <DisplayImages contract={props.contract} account={props.account} Images={props.Images}/>
  </>
  );
};

export default Display;
