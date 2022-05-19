import React, {useState, useEffect} from "react";

import SortableTree from "react-sortable-tree";
import 'react-sortable-tree/style.css'
import {updateManyDocuments} from "../../utils/api";

export const DocumentTree = ({levels}) => {


  const [tree, setTreeData] = useState(levels);

  useEffect(() => {
    console.log(tree)
  }, [tree]);



  async function moveNode(treeData) {
    if (treeData.nextParentNode) {
      treeData.node.pid = treeData.nextParentNode.id;
      const siblings = treeData.nextParentNode.children;
      const documents = [];
      siblings.forEach((sibling, index) => {
        documents.push({
          'id': sibling.id,
          'Order': index + 1,
          'Parent_ID': sibling.pid
        })
        return sibling.order = index + 1;
      })

      return await updateManyDocuments(documents);
    } else {
      treeData.node.pid = null
      const rootNodes = treeData.treeData;
      const documents = [];
      rootNodes.forEach((node, index) => {
        documents.push({
          'id': node.id,
          'Order': index + 1,
          'Parent_ID': node.pid
        })
        return node.order = index + 1;
      })
      return await updateManyDocuments(documents);
    }
  }

  return (
    <SortableTree
      treeData={tree}
      onChange={treeData => setTreeData(treeData)}
      onMoveNode={treeData => moveNode(treeData)}
      maxDepth={3}
    />
  );
}
