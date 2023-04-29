import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./upload.css";

function FileDragDrop({ handleChange, fileTypes, files }) {
  
  return (
    <FileUploader
      handleChange={handleChange}
      classes={"file_upload"}
      style={{ width: "100%" }}
      name="file"
      fileOrFiles={files}
      types={fileTypes}
    />
  );
}

export default FileDragDrop;
