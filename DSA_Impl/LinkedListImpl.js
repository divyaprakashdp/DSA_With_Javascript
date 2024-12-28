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

  prepend(value) {
    const newNode = {
      value: value,
      next: null,
    };

    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }

  print() {
    let headObj = this.head
    let result = [];
    while (headObj) {
      result.push(headObj.value)
      headObj = headObj.next;
    }
    console.log(result.join("  "))
  }
}

// const myLinkedList = new LinkedListImpl(10);
// myLinkedList.append(20);
// myLinkedList.append(30);
// myLinkedList.append(40);
// myLinkedList.prepend(5);
// myLinkedList.print();
// console.log(JSON.stringify(myLinkedList));

let list = new LinkedListImpl(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);//mid
list.append(6);
list.append(7);
list.append(8);

// list.print();

function getMidIndex(list) {
  let fp = list.head;
  let sp = list.head;
  while (fp) {
    fp = fp.next.next;
    sp = sp.next;
  }
  return sp.value;
}

// console.log(getMidIndex(list));

function rotateRight(list) {
  let headObj = list.head;

  let initialVal = headObj.value;
  let lastVal = list.tail.value;
  // headObj.value = lastVal;
  let nextVal;
  for (let i = 0; i < list.length; i++) {
    nextVal = headObj.value
    headObj.next.value = nextVal;

  }

  list.print()
}
rotateRight(list)

// 1 2 3 4 5 6 7 8
// 8 1 