function largestOfFour(arr) {
    let newArr = [];
    for(let i=0;i<arr.length;i++){
      let subArray = arr[i]
      let localHigh = arr[i][0];
      for(let j=0;j<subArray.length;j++){
        if(subArray[j]>localHigh){
          localHigh=subArray[j]
        }
      }
      newArr.push(localHigh);
    }
    return newArr;
  }
  
  console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));