import { File as FileType } from "./types";

export const File: React.FC<{ file: FileType }> = ({ file: { id, name } }) => {
  console.log(name);
  return <div className="file">{name}</div>;
};
