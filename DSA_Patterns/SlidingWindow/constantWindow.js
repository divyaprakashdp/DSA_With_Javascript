//2 Pointers & Sliding window
// 1. Constant window

// Problem: Given an array of integers, find the maximum values that can be calculated by summing exactly four consecutive integers.Then print the maximum values.
//Naive Solution O(n*n)

let arr = [-1, 20, 3, 3, 4, 5, -1];
let subArrayLength = 4;

function findMaxSum(arr, subArrayLength) {
    let maxSum = 0;

    for (let startIndex = 0; startIndex <= arr.length - subArrayLength; startIndex++) {
        let sum = 0;
        for (let subArrayIndex = startIndex; subArrayIndex < subArrayLength + startIndex; subArrayIndex++) {
            if (subArrayIndex < arr.length) {
                sum += arr[subArrayIndex];
            }
        }
        maxSum = Math.max(sum, maxSum);
    }
    console.log("Max sum of sub array = ", maxSum)
}

findMaxSum(arr, subArrayLength)

// better solution with Sliding Window Algo
//O(n)
function findMaxSumWithSlidingWindow(arr, subArrayLength) {
    let startIndex = 0;
    let endIndex = subArrayLength - 1;
    let windowSum = 0;
    let maxSum = 0;

    for (let i = 0; i < subArrayLength; i++) {
        windowSum += arr[i];
    }

    while (endIndex < arr.length - 1) {
        windowSum = windowSum - arr[startIndex]
        startIndex++;
        endIndex++;
        windowSum += arr[endIndex]
        maxSum = Math.max(windowSum, maxSum)
    }
    console.log("Using findMaxSumWithSlidingWindow: Max sum of sub array = ", maxSum)

}

findMaxSumWithSlidingWindow(arr, subArrayLength);