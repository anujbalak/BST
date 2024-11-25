class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  // sorting the array
  mergeSort(array) {
    if (array.length === 1) {
      return array;
    }
    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid, array.length);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  merge(left, right) {
    let result = [],
      leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  ///removing duplicates
  removeDuplicate(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
  }

  ///////////building the tree
  buildTree(array) {
    let sortedArray = this.mergeSort(array);
    let cleanedArray = this.removeDuplicate(sortedArray);
    this.root = this.build(cleanedArray, 0, cleanedArray.length - 1)
    return this.root
  }

  build(array, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.build(array, start, mid - 1)
    root.right = this.build(array, mid + 1, end);
    return root;
  }

  /////insert
  insert(value) {
    if (this.root === null || this.root === undefined) {
      this.root = new Node(value);
    }

    let current = this.root;
    function check(current) {
      if (current.data === value) return null;
      if (current.data > value) {
        if (current.left !== null) return check(current.left);
        current.left = new Node(value);
      } else {
        if (current.right !== null) return check(current.right);
        current.right = new Node(value);
      }
    }
    return check(current);
  }

  deleteItem(value) {
    if (this.root === value) {
      this.root.data = null;
      return;
    }
    let current = this.root
    
    function remove(current, prevElement = null) {
      if (current.data === value) {
        if (current.left === null && current.right === null) {
          prevElement.right = null 
          return;
        }
      }
      if (current.data > value) {
        if (current.left !== null) return remove(current.left, current);
        return 'No such value';
      } else {
        if (current.right !== null) return remove(current.right, current);
        return 'No such value';
      }
    }
    remove(current);
  }
}


let bst = new Tree();
bst.insert(5)
bst.insert(2)
bst.insert(1)
bst.insert(3)
bst.insert(6);
bst.insert(8);
bst.insert(10);
bst.insert(4);
bst.insert(9)
bst.deleteItem(4)
console.log(bst.root.left);
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
