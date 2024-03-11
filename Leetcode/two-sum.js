// https://leetcode.com/problems/two-sum/

//O(n^2)
const twoSum = (nums, target) => {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (target > nums[i]) {
        if (target === nums[i] + nums[j]) {
          result[0] = i;
          result[1] = j;
          break;
        }
      }
    }
  }
  return result;
};

//O(n)
const twoSumOptimized = (nums, target) => {};

// test cases

console.log(twoSum([0, 14, 4], 4)); //[0,2]
console.log(twoSum([2, 7, 11, 15], 9)); //[0,1]
console.log(twoSum([11, 15, 2, 7], 9)); //[2,3]
console.log(twoSum([3, 3], 6)); //[0,1]
console.log(twoSum([-1, -2, -3, 4, -5], 2)); //[1, 3]
console.log(twoSum([-1, -2, -3, -4, -5], -8)); //[2, 4]
console.log(
  twoSum([1000000000, 2000000000, 3000000000, 4000000000], 5000000000)
); //[1,2]
console.log(twoSum([1, 2, 3, 4, 5], 20));
