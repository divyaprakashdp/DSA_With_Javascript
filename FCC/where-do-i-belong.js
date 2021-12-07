function getIndexToIns(arr, num) {
    if(arr.length == 0){
      return 0
    }
  
    arr.sort(function(a, b){return a - b})
    
    for(let i=0;i<arr.length;i++){
      if(arr[i]>=num){
        return i
      }
      
      
      
    }
    return arr.length
  }
  
  console.log(getIndexToIns([100, 20, 30, 40, 50], 30));

//   Passed
//   getIndexToIns([10, 20, 30, 40, 50], 35) should return 3.

// Passed
// getIndexToIns([10, 20, 30, 40, 50], 35) should return a number.

// Passed
// getIndexToIns([10, 20, 30, 40, 50], 30) should return 2.

// Passed
// getIndexToIns([10, 20, 30, 40, 50], 30) should return a number.

// Passed
// getIndexToIns([40, 60], 50) should return 1.

// Passed
// getIndexToIns([40, 60], 50) should return a number.

// Passed
// getIndexToIns([3, 10, 5], 3) should return 0.

// Passed
// getIndexToIns([3, 10, 5], 3) should return a number.

// Passed
// getIndexToIns([5, 3, 20, 3], 5) should return 2.

// Passed
// getIndexToIns([5, 3, 20, 3], 5) should return a number.

// Passed
// getIndexToIns([2, 20, 10], 19) should return 2.

// Passed
// getIndexToIns([2, 20, 10], 19) should return a number.

// Passed
// getIndexToIns([2, 5, 10], 15) should return 3.

// Passed
// getIndexToIns([2, 5, 10], 15) should return a number.

// Passed
// getIndexToIns([], 1) should return 0.

// Passed
// getIndexToIns([], 1) should return a number.