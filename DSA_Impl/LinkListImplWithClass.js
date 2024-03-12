class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListImplWithClass {
  constructor(value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new Node(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head; //set the existing head as next of newNode
    this.head = newNode;
    this.length++;
    return this;
  }
}

const myLinkedList = new LinkedListImplWithClass(10);
myLinkedList.append(20);
myLinkedList.append(30);
myLinkedList.append(40);
myLinkedList.prepend(5);
console.log(JSON.stringify(myLinkedList));
