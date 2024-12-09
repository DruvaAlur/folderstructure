import logo from "./logo.svg";
import "./App.css";
import Folderstructure from "./components/Folderstructure";
import jsondata from "./folder-structure.json";
import { useState } from "react";
import addFolder from "./assets/add-folder.png";
import addFile from "./assets/add-file.png";
import edit from "./assets/edit.png";
import deleteFolder from "./assets/delete.png";

function App() {
  let initialTree = jsondata;
  const [tree, setTree] = useState(initialTree);
  const [isSelected, setIsSelected] = useState(["root"]);

  const addNode = (addType) => {
    let path = isSelected;
    let type = addType;
    const name = prompt(`Enter ${type} name:`);
    if (!name) return;
    if (addType == "file" && !/\.[^.]+$/.test(name)) {
      alert(`Enter File name with Extension like .txt, .jpeg, .json etc`);
      return;
    }
    const newTree = JSON.parse(JSON.stringify(tree));
    const node = path.reduce((acc, key) => acc[key], newTree);

    node[name] = {};

    setTree(newTree);
  };

  const editNode = () => {
    let path = isSelected;
    const newName = prompt("Enter new name:");
    if (!newName) return;

    const newTree = JSON.parse(JSON.stringify(tree));
    const parent = path.slice(0, -1).reduce((acc, key) => acc[key], newTree);
    const oldName = path[path.length - 1];

    parent[newName] = parent[oldName];
    delete parent[oldName];

    setTree(newTree);
  };

  const deleteNode = () => {
    let path = isSelected;
    if (!window.confirm("Are you sure you want to delete this?")) return;

    const newTree = JSON.parse(JSON.stringify(tree));
    const parent = path.slice(0, -1).reduce((acc, key) => acc[key], newTree);
    const nodeName = path[path.length - 1];

    if (Array.isArray(parent)) {
      const index = parent.indexOf(nodeName);
      if (index > -1) parent.splice(index, 1);
    } else {
      delete parent[nodeName];
    }

    setTree(newTree);
  };

  return (
    <div className="App">
      <h1>Folder Structure</h1>
      <div style={{ marginLeft: "20px" }}>
        <span onClick={() => addNode("folder")}>
          <img style={{ height: "30px", width: "30px" }} src={addFolder} />
        </span>
        <span onClick={() => addNode("file")}>
          <img style={{ height: "30px", width: "30px" }} src={addFile} />
        </span>
        <span onClick={editNode}>
          <img style={{ height: "30px", width: "30px" }} src={edit} />
        </span>
        <span onClick={deleteNode}>
          <img style={{ height: "30px", width: "30px" }} src={deleteFolder} />
        </span>
      </div>
      <Folderstructure
        tree={tree}
        path={[]}
        addNode={addNode}
        editNode={editNode}
        deleteNode={deleteNode}
        setIsSelected={setIsSelected}
        isSelected={isSelected}
      />
    </div>
  );
}

export default App;
