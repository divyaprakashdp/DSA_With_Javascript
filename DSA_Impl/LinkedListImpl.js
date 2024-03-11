class LinkedListImpl {
  constructor(value) {
    this.head = {
      value: value,
      next: null,
    };
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = {
      value: value,
      next: null,
    };
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }
}

const myLinkedList = new LinkedListImpl(10);
myLinkedList.append(20);
myLinkedList.append(30);
myLinkedList.append(40);
console.log(JSON.stringify(myLinkedList));
