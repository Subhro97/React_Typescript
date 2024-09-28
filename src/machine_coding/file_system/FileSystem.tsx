import Folder from "./Folder";
import "./FileSystem.css";
import { Folder as FolderType } from "./types";
import React from "react";

const FileSystem: React.FC = () => {
  let data: FolderType = {
    id: null,
    name: "TypeScript",
    type: "",
    files: [
      {
        id: null,
        name: "index.html",
      },
    ],
    folders: [
      {
        id: null,
        name: "Machine Coding",
        type: "",
        files: [],
        folders: [],
      },
    ],
  };

  return <Folder folder={data} />;
};

export default FileSystem;

/*

1. Display the UI
2. Add Functionality

 */
