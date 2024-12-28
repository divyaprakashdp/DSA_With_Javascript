import LinkedListImpl from "./../../DSA_Impl/LinkedListImpl.js"


let list = new LinkedListImpl();
list.append(10);
list.append(11);
list.append(14);
list.append(40);//mid
list.append(50);
list.append(101);
list.append(1);

console.log(list.print())