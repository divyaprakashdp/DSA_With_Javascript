class ArrayImpl {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  get(index) {
    //O(1)
    return this.data[index];
  }

  push(value) {
    //O(1)
    this.data[this.length] = value;
    this.length++;
  }

  pop() {}

  set(index, value) {
    //O(n)
    this.length++;
    let newValue = value;
    for (let i = index; i < this.length; i++) {
      const oldVal = this.data[i];
      this.data[i] = newValue;
      newValue = oldVal;
    }
  }

  delete(index) {
    //O(n)
    for (let i = index; i < this.length; i++) {
      const newValue = this.data[i + 1];
      this.data[i] = newValue;
    }
    this.length--;
  }
}
const arr = new ArrayImpl();
arr.push(13);

arr.push(15);
arr.push(89);
arr.push(56);
console.log(arr.data);
arr.set(1, 12);
console.log(arr.data);
arr.delete(3);
console.log(arr.data);
console.log(arr.length);
