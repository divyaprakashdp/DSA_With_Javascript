function sumAll(arr) {
    arr.sort(function(a,b){
      return a-b
    })
    let newArr = []
    for(let i=arr[0];i<=arr[1];i++){
      newArr.push(i)
    }
    console.log(newArr)
    return newArr.reduce((a,b) => a+b);
  }
  
  console.log(sumAll([1, 4]));//10
  console.log(sumAll([5, 10]));//45