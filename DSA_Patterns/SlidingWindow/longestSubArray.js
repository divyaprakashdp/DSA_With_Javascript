//2. Longest Subarray/substrings along with a <condition>

//Example prob: Given an array and a sum k, we need to print the length of the longest subarray that sums to less than k.


//Naive Solution O(N*N)

let arr = [2, 5, 1, 7, -10]
let k = 14;

function findMaxLengthArray(arr, k) {

    let maxLength = 0;
    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            sum += arr[j];
            if (sum < k) {
                maxLength = Math.max(maxLength, j - i + 1)
            } else if (sum >= k) {
                break;
            }
        }
    }
    console.log(`Max length of sub-array with sum of less than ${k} = ${maxLength}`)
}

findMaxLengthArray(arr, k);

// Better solution with sliding window O(2N)
// Both endIndex and startIndex pointers traverse the array at most once. Therefore, the algorithm processes each element of the array at most twice—once when expanding the window and once when contracting it. This results in O(N) time complexity.

function longestSubArraWithSlidingWindow(arr, k) {
    let startIndex = 0;
    let endIndex = 0;
    let sum = 0;
    let maxLength = 0;

    while (endIndex < arr.length) {
        sum += arr[endIndex];

        while (sum >= k) {
            sum -= arr[startIndex];
            startIndex++;
        }

        if (sum < k) {
            maxLength = Math.max(maxLength, endIndex - startIndex + 1)
        }

        endIndex++;
    }

    console.log(`Using sliding window: Max length of sub-array with sum of less than ${k} = ${maxLength}`)

}

longestSubArraWithSlidingWindow(arr, k);


//Prob 1: Given a string s, find the length of the longest substring without repeating characters.

//Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

// brute force solution O(n^2):

function findLongestUniqueSubStrLength(str) {
    if (str.length <= 1 || typeof (str) !== "string") {
        console.log("invalid input");
        return;
    }
    let maxLength = 0;
    for (let i = 0; i < str.length; i++) {
        for (let j = i; j < str.length; j++) {
            let substr = str.slice(i, j);
            let uniqueChars = new Set(substr);

            if (substr.length === uniqueChars.size) {
                maxLength = Math.max(substr.length, maxLength)
            }
        }
    }
    console.log(`Length of the longest substring without repeating characters = ${maxLength}`)
}
findLongestUniqueSubStrLength("abcabcbb");
findLongestUniqueSubStrLength("bbbbb");
findLongestUniqueSubStrLength("")
findLongestUniqueSubStrLength(717)

//Optimal solution with sliding window

function findLengthOfLongestSubStrWithSlidingWin(str) {

    if (str.length <= 1 || typeof (str) !== "string") {
        console.log("invalid input");
        return;
    }

    let charMap = {};
    let startIndex = 0;
    let endIndex = 0;
    let maxLength = 0;

    for (endIndex; endIndex < str.length; endIndex++) {
        const currentChar = str[endIndex];

        if (charMap[currentChar] !== undefined && charMap[currentChar] >= startIndex) {
            startIndex = charMap[currentChar] + 1;
        }

        charMap[currentChar] = endIndex;

        maxLength = Math.max(maxLength, endIndex - startIndex + 1);
    }
    console.log(`With Sliding Window: Length of the longest substring without repeating characters = ${maxLength}`)
}

findLengthOfLongestSubStrWithSlidingWin("abcabcbb");
findLengthOfLongestSubStrWithSlidingWin("bbbbb");
findLengthOfLongestSubStrWithSlidingWin("");
findLengthOfLongestSubStrWithSlidingWin(717);


//Given a binary array nums, return the maximum number of consecutive 1's in the array.

// Example 1:

// Input: nums = [1, 1, 0, 1, 1, 1]
// Output: 3
// Explanation: The first two digits or the last three digits are consecutive 1s.The maximum number of consecutive 1s is 3.
// Example 2:

// Input: nums = [-1, 0, 1, 1, 0, 1]
// Output: 2

function maxNumOfOnes(nums) {
    let startIndex = 0;
    let endIndex = 0;
    let maxLength = 0;

    while (endIndex < nums.length) {
        if (nums[endIndex] === 0) {
            startIndex = endIndex + 1;
        }
        maxLength = Math.max(maxLength, endIndex - startIndex + 1);
        endIndex += 1;
    }
    return maxLength;
}

console.log(maxNumOfOnes([1, 1, 0, -1, 1, 1]))

// The power of the string is the maximum length of a non - empty substring that contains only one unique character.

// Given a string s, return the power of s.



//     Example 1:

// Input: s = "leetcode"
// Output: 2
// Explanation: The substring "ee" is of length 2 with the character 'e' only.
//     Example 2:

// Input: s = "abbcccddddeeeeedcba"
// Output: 5
// Explanation: The substring "eeeee" is of length 5 with the character 'e' only.

function maxPower(s) {
    let maxLength = 0;
    let startIndex = 0;
    let endIndex = 0;

    while (endIndex < s.length) {
        if (s[startIndex] !== s[endIndex]) {
            startIndex = endIndex;
        }
        maxLength = Math.max(maxLength, endIndex - startIndex + 1);
        endIndex += 1;
    }
    return maxLength;
}

console.log(maxPower("leeeetcode"));