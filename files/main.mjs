import { Tree } from "./bst.mjs";

function generateArrayOfRandomNumber(n) {
    let array = []
    for (let i = 1; i <= n; i++) {
        let number = Math.floor(Math.random() * (100 - 1) + 1)
        array.push(number)
    }
    return array
}

let array = generateArrayOfRandomNumber(100);

let bst = new Tree();

bst.buildTree(array);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(bst.root)

bst.insert(101);
bst.insert(242);
bst.rebalance();
console.log(bst.isBalanced())