import Folder from "./Folder";
function Folderstructure({
  tree,
  path,
  addNode,
  editNode,
  deleteNode,
  setIsSelected,
  isSelected,
}) {
  return Object.entries(tree).map(([key, value]) => (
    <Folder
      key={key}
      name={key}
      value={value}
      path={[...path, key]}
      addNode={addNode}
      editNode={editNode}
      deleteNode={deleteNode}
      setIsSelected={setIsSelected}
      isSelected={isSelected}
    />
  ));
}
export default Folderstructure;
