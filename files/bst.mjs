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
    if (this.root.data === value) {
      if (this.root.left === null && this.root.right === null) {
        this.root.data = null;
        return;
      }
      let current = this.root
      if (current.left !== null) {
        if (current.right !== null) {
          current = current.left;
          while (current.right !== null) {
            current = current.right;
          }
          current.right = this.root.right;
        }
        this.root = this.root.left;
        return;
      } else {
        this.root = this.root.right;
        return;
      }
    }
    let current = this.root
    function remove(current, prevElement = null) {
      if (current.data === value) {
        if (current.left === null && current.right === null) {
          if (prevElement.left !== null) {
            if (prevElement.left.data === value) {
              prevElement.left = null;
              return;
            }
          }
          prevElement.right = null 
          return;
        }
        ///////////////////////delete
        if (prevElement.left !== null && prevElement.left.data === value) {
          if (current.left !== null) {
            if (current.right !== null) {
              current = current.left;
              while (current.right !== null) {
                current = current.right;
              }
              current.right = prevElement.left.right;
            }
            prevElement.left = prevElement.left.left
            return;
          } else {
            prevElement.left = current.right;
            return;
          }
        } else {
          if (current.left !== null) {
            if (current.right !== null) {
              current = current.left
              while (current.right !== null) {
                current = current.right;
              }
              current.right = prevElement.right.right;
            }
            prevElement.right = prevElement.right.left;
            return
          } else {
            prevElement.right = current.right;
            return
          }
        }  
        ///////////////////////////
      }
      
      ///recursion
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

  find(value, current = this.root) {
    if (current.data === value) {
      return current;
    }
    if (value < current.data) {
      return this.find(value, current.left);
    } else if(value > current.data) {
      return this.find(value, current.right);
    } else {
      return 'No such Value';
    }
  }

  levelOrderRec(callback, queueArray = [this.root]) {
    if (callback === null || callback === undefined) {
      throw new Error('Callback is null');
    }
    if (queueArray.length === 0) return;
    let current = queueArray[0];
    callback(current);
    queueArray.shift()
    if (current.left !== null && current.right === null) {
      queueArray.push(current.left);
      return this.levelOrderRec(callback, queueArray);
    } else if(current.right !== null && current.left === null) {
      queueArray.push(current.right);
      return this.levelOrderRec(callback, queueArray);
    } else if(current.right !== null && current.left !== null) {
      queueArray.push(current.left, current.right);
      return this.levelOrderRec(callback, queueArray);
    } else {
      return this.levelOrderRec(callback, queueArray)
    }
  }

  levelOrder(callback) {
    if (callback === null || callback === undefined) {
      throw new Error('Callback is null');
    }
    let queueArray = [this.root];
    while (queueArray.length !== 0) {
      let current = queueArray[0];
      callback(current);
      queueArray.shift();
      if (current.left !== null && current.right === null) {
        queueArray.push(current.left);
      } else if(current.right !== null && current.left === null) {
        queueArray.push(current.right);
      } else if(current.right !== null && current.left !== null) {
        queueArray.push(current.left, current.right);
      } else {
        //
      }
    }
  }

  inOrder(callback, stackArray = [this.root]) {
    if (callback === null || callback === undefined) {
      throw new Error('Callback is null');
    }
    if (stackArray.length === 0) return;
    let current = stackArray[stackArray.length - 1];
    if (current.left !== null) {
      stackArray.push(current.left);
      return this.inOrder(callback, stackArray);
    }
    if (current.left === null) {
      callback(current);
      stackArray.pop();
      if (current.right !== null) {
        stackArray.push(current.right);
        return this.inOrder(callback, stackArray);
      }
      if (stackArray.length > 0) {
        current = stackArray[stackArray.length - 1];
      
        while (current.right === null) {
          callback(current);
          stackArray.pop();
          current = stackArray[stackArray.length - 1]
        }
        callback(current);
        stackArray.pop(current);
        stackArray.push(current.right);
        return this.inOrder(callback, stackArray);
      }
    }
  }

  preOrder(callback, stackArray = [this.root]) {
    if (callback === null || callback === undefined) {
      throw new Error('Callback is null');
    }
    if (stackArray.length === 0) return;
    let current = stackArray[stackArray.length - 1];
    if (current === null) return;
    callback(current);
    stackArray.pop();
    if (current.right !== null) {
      stackArray.push(current.right);
      if (current.left !== null) {
        stackArray.push(current.left);
      }
      return this.preOrder(callback, stackArray);
    } else if (current.right === null) {
      if (current.left !== null) {
        stackArray.push(current);
      }
      return this.preOrder(callback, stackArray);
    } 
  }

  postOrder(callback, current = this.root) {
    if (callback === undefined || callback === null) {
      throw new Error('Callback is null or invalid.');
    }

    if (current === null) return;
    return (
      this.postOrder(callback, current.left),
      this.postOrder(callback, current.right),
      callback(current)
    )
  }

  inOrderButSmart(callback, current = this.root) {
    if (callback === undefined || callback === null) {
      throw new Error('Callback is null or invalid.');
    }

    if (current === null) return;
    return (
      this.inOrderButSmart(callback, current.left),
      callback(current),
      this.inOrderButSmart(callback, current.right)
    )
  }

  preOrderButSmart(callback, current = this.root) {
    if (callback === undefined || callback === null) {
      throw new Error('Callback is null or invalid.');
    }

    if (current === null) return;
    return (
      callback(current),
      this.preOrderButSmart(callback, current.left),
      this.preOrderButSmart(callback, current.right)
    )
  }

  height(node = this.root, count = 0, countArray = []) {
    if (node == null) {
      countArray.push(count);
      return;
    }

    function returnHeight(array) {
      let sorted = array.filter((item, index) => array.indexOf(item) === index);
      sorted.sort();
      let lastItem = sorted[sorted.length - 1] - 1;
      return lastItem;
    }
    return (
      this.height(node.left, count + 1, countArray),
      this.height(node.right, count + 1, countArray),
      returnHeight(countArray)
    )
  }

  depth(node, current = this.root, depthCount = 0){
    if (node == null) throw new Error('node is null');
    if (current === node) {
      return depthCount;
    }
    if (node.data < current.data) {
      return this.depth(node, current.left, depthCount + 1);
    } else if(node.data > current.data) {
      return this.depth(node, current.right, depthCount + 1);
    } else {
      return 'No such Value';
    }
  }
}


function buildLinearArrayOf(n) {
  let array = []
  for (let i = 1; i <= n; i++) {
    array.push(i);
  }
  return array;
}

let array = buildLinearArrayOf(10);

let bst = new Tree();
let list = [4, -4, 0, 3, 100, 1]
bst.buildTree(array)

// let call = bst.postOrder((node) => {
//   console.log(node.data);
// })


// bst.insert(5)
// bst.insert(2)
// bst.insert(1)
// bst.insert(3)
// bst.insert(6);
// bst.insert(8);
// bst.insert(10);
// bst.insert(4);
// bst.insert(9);
// bst.insert(1.5)
// bst.insert(11);
// bst.insert(-3);
// bst.insert(-5)
// bst.insert(0);
// bst.insert(-1);
// bst.insert(-2)
// bst.insert(-0.5)
// bst.insert(12);
// bst.insert(9.1);
// bst.insert(9.5);
// bst.insert(9.7);
// bst.deleteItem(5);
// bst.deleteItem(2);
// bst.deleteItem(1)
// bst.deleteItem(-3)
// bst.deleteItem(-5)
// bst.deleteItem(0)
// bst.deleteItem(-1)
// bst.deleteItem(-2)

// console.log(bst.root);
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

prettyPrint(bst.root);
