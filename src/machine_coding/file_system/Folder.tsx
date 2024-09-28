import React, { useReducer, useState } from "react";
import { FolderReducer, FolderState, Folder as FolderType } from "./types";
import { File } from "./File";
import { folderReducer } from "./reducer/folderReducer";

const Folder: React.FC<{
  folder: FolderType;
}> = ({ folder: { id, name, type, files, folders } }) => {
  const [folderData, dispatch] = useReducer<FolderReducer>(folderReducer, {
    folders: [...folders],
    files: [...files],
    addFile: false,
    addFolder: false,
  });

  const addNewHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    if (e.key !== "Enter" || value.trim() === "") return;

    if (folderData.addFile) {
      dispatch({ type: "NEW_FILE", name: value });
    } else {
      dispatch({ type: "NEW_FOLDER", name: value });
    }
  };

  console.log(folderData.files);

  return (
    <section className="folder__cont">
      <div className="folder">
        <p className="folder__name">{name}</p>
        <div className="folder__btn__wrap">
          <button onClick={() => dispatch({ type: "ADD_FILE" })}>+ file</button>
          <button onClick={() => dispatch({ type: "ADD_FOLDER" })}>
            + folder
          </button>
        </div>
      </div>
      {(folderData.addFile || folderData.addFolder) && (
        <input
          className="folder__input"
          type="text"
          placeholder={folderData.addFile ? "Add File" : "Add Folder"}
          autoFocus
          onKeyDown={addNewHandler}
        />
      )}
      {folderData.files.length > 0 &&
        folderData.files.map((file, idx) => (
          <File key={Math.random()} file={file} />
        ))}
      {folderData.folders.length > 0 &&
        folderData.folders.map((folder, idx) => (
          <Folder key={Math.random()} folder={folder} />
        ))}
    </section>
  );
};

export default Folder;
