// Problem Statement: Given an array, we have to find the largest element in the array.
function findLargest(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        max = Math.max(max, arr[i])
    }
    return max;
}

console.log(findLargest([98, 0, 1, 102, 270]));
console.log(findLargest([98, 0, 1, -102, -27]));

function findLargestRecursive(arr, largest, start) {
    if (start > arr.length - 1) return largest;
    largest = Math.max(largest, arr[start]);
    return findLargestRecursive(arr, largest, start + 1);
}

console.log(findLargestRecursive([98, 0, 1, 102, 270], -99999, 0));
console.log(findLargestRecursive([-98, -2, -1, -102, -27], -99999, 0));

// Problem Statement: Given an array, find the second smallest and second largest element in the array.Print ‘-1’ in the event that either of them doesn’t exist.
function findSecondSmallestAndLargest(arr) {
    if (arr.length < 2) return -1;
    arr.sort((a, b) => a - b);
    return [arr[1], arr[arr.length - 2]]
}

console.log(findSecondSmallestAndLargest([98, 0, 1, 102, 270]));
console.log(findSecondSmallestAndLargest([98, 0, 1]));
console.log(findSecondSmallestAndLargest([98, 0]));

function find2ndMinAndMax(arr) {
    if (arr.length < 2) return -1;
    let min = arr[0];
    let secondMin = Infinity;
    let max = arr[0];
    let secondMax = -Infinity;
    for (let i = 1; i < arr.length; i++) {
        min = Math.min(min, arr[i]);
        max = Math.max(max, arr[i]);
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== min && arr[i] < secondMin) {
            secondMin = arr[i]
        }
        if (arr[i] !== max && arr[i] > secondMax) {
            secondMax = arr[i]
        }
    }

    return [secondMax, secondMin];

}

console.log(find2ndMinAndMax([98, 0, 1, 102, 270]));
console.log(find2ndMinAndMax([98, 0, 1]));
console.log(find2ndMinAndMax([98, 0]));

// Problem Statement: Given an array of size n, write a program to check if the given array is sorted in (ascending / Increasing / Non - decreasing) order or not.If the array is sorted then return True, Else return False.
function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false
        }
    }
    return true;
};

console.log(isSorted([1, 2, 4, 4, 9]));
console.log(isSorted([1, 2, 4, 4, 0]));
console.log(isSorted([1, 20, 3, 4, 5]))

// Problem Statement: Given an integer array sorted in non - decreasing order, remove the duplicates in place such that each unique element appears only once.The relative order of the elements should be kept the same. Return the length of array.
function removeDuplicate(arr) {
    let output = arr.length
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            output--;
        }
    }
    return output;
}

console.log(removeDuplicate([1, 2, 3, 3, 4, 5]));

// Problem Statement: Given an integer array sorted in non - decreasing order, remove the duplicates in place such that each unique element appears only once.The relative order of the elements should be kept the same. Return the array
function removeDuplicate1(arr) {
    let checkIndex = 0;
    for (let i = 1; i < arr.length - 1; i++) {
        if (arr[i] !== arr[checkIndex]) {
            checkIndex++;
            arr[checkIndex] = arr[i]
        }
    }
    return arr.slice(0, checkIndex + 1);
}

console.log(removeDuplicate([1, 2, 3, 3, 4, 5]));

// Problem Statement: Given an array of N integers, left rotate the array by one place.
// Example : [1, 2, 3, 4, 5] => Output: [2, 3, 4, 5, 1]
function leftRotateBy1(arr) {
    let temp = arr[0];
    for (let i = 0; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1]
    }
    arr[arr.length - 1] = temp
    return arr;
}

console.log(leftRotateBy1([1, 2, 3, 4, 5]));

// Problem Statement: Given an array of integers, rotating array of elements by k elements either left or right.
function rotateArray(arr, k, side) {
    let tempArr = []
    if (side === "left") {
        for (let i = 0; i < k; i++) {
            tempArr.push(arr[i])
        }
        for (let i = 0; i < arr.length - k; i++) {
            arr[i] = arr[i + k]
        }

        for (let i = 0; i < k; i++) {
            arr[arr.length - k + i] = tempArr[i]
        }

    } else {
        for (let i = k; i > 0; i--) {
            tempArr.push(arr[arr.length - i])
        }

        for (let i = arr.length - 1; i > 0; i--) {
            arr[i] = arr[i - k]
        }

        for (let i = 0; i < k; i++) {
            arr[i] = tempArr[i]
        }

    }

    return arr
}

console.log(rotateArray([3, 7, 8, 9, 10, 11, 1], 3, "left"))
console.log(rotateArray([3, 7, 8, 9, 10, 11, 1], 3, "right"))

function rotateArrayLeftByReverse(arr, k) {
    //[3, 7, 8, 9, 10, 11, 1]
    reverseArray(arr, 0, k - 1);//left => [8, 7, 3, 9, 10, 11, 1]
    reverseArray(arr, k, arr.length - 1);//[8, 7, 3, 1, 11, 10, 9]
    reverseArray(arr, 0, arr.length - 1);//[9, 10, 11, 1, 3, 7, 8]

    return arr;
}

function reverseArray(arr, start, end) {
    while (start <= end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

console.log(rotateArrayLeftByReverse([3, 7, 8, 9, 10, 11, 1], 3));

// Problem Statement: You are given an array of integers, your task is to move all the zeros in the array to the end of the array and move non - negative integers to the front by maintaining their order.
// Input:
// 1, 0, 2, 3, 0, 4, 0, 1
// Output:
// 1, 2, 3, 4, 1, 0, 0, 0

function moveZeroToEndBF(arr) {
    let tempArr = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            tempArr.push(arr[i]);
        }
    }


    while (tempArr.length < arr.length) {
        tempArr.push(0)
    }

    return tempArr
}

console.log(moveZeroToEndBF([1, 0, 2, 3, 0, 4, 0, 1]));

// function moveZeroToEnd(arr) {
//     for (let i = 0; i < arr.length - 1; i++) {

//         if (arr[i] === 0) {
//             [arr[i], arr[i + j]] = [arr[i + j], arr[i]];
//         }
//     }

//     console.log(arr)
// }

// moveZeroToEnd([1, 0, 2, 3, 0, 4, 0, 1])

