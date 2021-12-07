function chunkArrayInGroups(arr, size) {
    let newArr = [];
    while(arr.length >0){
      newArr.push(arr.splice(0, size));
    }
    return newArr;
  }
  
  console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3));