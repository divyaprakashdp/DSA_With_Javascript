// Given a sorted list of numbers, remove duplicates and return the new length.You must do this in -place and without using extra memory.

//     Input: [0, 0, 1, 1, 1, 2, 2].

//     Output: 3.

// Your function should modify the list in place so that the first three elements become 0, 1, 2. Return 3 because the new length is 3.
//brute force
const removeDuplicates = (arr) => {
    let l = 0;
    let r = 1;

    while (r <= arr.length - 1) {
        if (arr[l] === arr[r]) {
            arr.splice(l, 1);
        } else {
            l++;
            r++;
        }
    }

    return arr;
}

let arr = [0, 0, 1, 1, 1, 2, 2];
console.log(removeDuplicates(arr));

//optimized
const removeDuplicatesOpt = (arr) => {
    let l = 0;
    for (let r = 1; r < arr.length; r++) {
        if (arr[l] !== arr[r]) {
            l++;
            arr[l] = arr[r];
        }
    }
    return arr.slice(0, l + 1);
}
let arr1 = [0, 0, 1, 1, 1, 2, 2]
console.log(removeDuplicatesOpt(arr1));


// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.



//     Example 1:

// Input: nums = [1, 2, 3, 1]

// Output: true

// Explanation:

// The element 1 occurs at the indices 0 and 3.

const containsDuplicate = function (nums) {
    nums.sort((a, b) => a - b);
    let l = 0;
    for (let r = 1; r < nums.length; r++) {
        if (nums[l] !== nums[r]) {
            l++;
            nums[l] = nums[r];
        } else {
            return true
        }

    }
    return false;
};


// https://leetcode.com/problems/two-sum/description/

const twoSum = (arr, target) => {
    let left = 0;
    let right = 1;
    while (left < right) {
        if (right > arr.length - 1) {
            left++;
            right = left + 1;
        }
        if (arr[right] === target - arr[left]) {
            return [left, right]
        } else {
            right++;
        }
    }
}

let tsArr = [3, 2, 4];

console.log(twoSum(tsArr, 6));



// https://leetcode.com/problems/squares-of-a-sorted-array/description/

const sortedSquareArr = (arr) => {
    let sqareArr = arr.map(el => el * el);
    return sqareArr.sort((a, b) => a - b);
}

let ssArr = [-4, -1, 0, 3, 10];
console.log(sortedSquareArr(ssArr));



// https://leetcode.com/problems/is-subsequence/

const isSubsequence = function (s, t) {
    let subsequence = 0;
    for (let i = 0; i < t.length; i++) {
        if (s[subsequence] === t[i]) {
            subsequence++
        }
    }
    return subsequence === s.length;
};