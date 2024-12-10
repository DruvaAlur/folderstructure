import { useState } from "react";
import Folderstructure from "./Folderstructure";

function Folder({
  name,
  value,
  path,
  addNode,
  editNode,
  deleteNode,
  setIsSelected,
  isSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = /\.[^.]+$/.test(name) ? false : typeof value === "object";
  const handleClick = () => {
    setIsOpen(!isOpen);
    setIsSelected(path);
  };
  return (
    <div style={{ marginLeft: "20px", width: "30%" }}>
      <ul
        style={{
          backgroundColor:
            JSON.stringify(isSelected) == JSON.stringify(path) ? "dimgrey" : "",
          width: "auto",
        }}
      >
        {isFolder && (
          <li
            onClick={handleClick}
            style={{
              width: "max-content",
              backgroundColor:
                JSON.stringify(isSelected) == JSON.stringify(path)
                  ? "dimgrey"
                  : "",
              cursor: "pointer",
            }}
          >
            {isOpen ? "▼📂" : "▶📁"} {name}
          </li>
        )}
        {!isFolder && (
          <li
            onClick={handleClick}
            style={{
              width: "max-content",
              backgroundColor:
                JSON.stringify(isSelected) == JSON.stringify(path)
                  ? "dimgrey"
                  : "",
              cursor: "pointer",
            }}
          >
            📄 {typeof value === "object" ? name : value}
          </li>
        )}
      </ul>
      {isFolder && isOpen && (
        <div>
          <Folderstructure
            tree={value}
            path={path}
            addNode={addNode}
            editNode={editNode}
            deleteNode={deleteNode}
            setIsSelected={setIsSelected}
            isSelected={isSelected}
          />
        </div>
      )}
    </div>
  );
}
export default Folder;
