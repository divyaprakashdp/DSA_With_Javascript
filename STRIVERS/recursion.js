// Problem: Print your Name N times using recursion

function printName(i, n, name) {
    if (i > n) return;
    console.log(name)
    printName(i + 1, n, name)
}

// printName(1, 5, "DP")

// Problem: Print from 1 to N using Recursion
function print1ToN(i, n) {
    if (i > n) return;
    console.log(i);
    print1ToN(i + 1, n);
}

// print1ToN(1, 10);

// Problem: Print from N to 1 using Recursion
function printNto1(i, n) {
    if (i > n) return;
    console.log(n);
    printNto1(i, n - 1);
}

// printNto1(1, 5);

// Problem statement: Given a number ‘N’, find out the sum of the first N natural numbers.
function sumOfFirstN(i, n, sum) {
    if (i > n) {
        console.log(sum);
        return;
    };
    sumOfFirstN(i + 1, n, sum + i);
}

sumOfFirstN(1, 3, 0)

function sumOfFirstNFunctional(n) {
    if (n === 0) return 0;
    return n + sumOfFirstNFunctional(n - 1)
}

console.log(sumOfFirstNFunctional(3))

// Problem Statement: Given a number X, print its factorial.

// To obtain the factorial of a number, it has to be multiplied by all the whole numbers preceding it.More precisely X! = X * (X - 1) * (X - 2) … 1.
function findFactorial(n) {
    if (n === 0) return 1;
    return n * findFactorial(n - 1);
}

console.log(findFactorial(4));

// Problem Statement: You are given an array.The task is to reverse the array and print it. 
function reverseArrayBF(arr) {
    let result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i])
    }
    return result;
}

console.log(reverseArrayBF([1, 2, 3, 4]))

function revesreArrayInMemory(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
        let temp = arr[i];
        arr[i] = arr[arr.length - 1 - i]
        arr[arr.length - 1 - i] = temp
    }
    return arr;
}

console.log(revesreArrayInMemory([1, 2, 3, 4]));

function revesreArrayInMemoryJS(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
        [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]]
    }
    return arr;
}

console.log(revesreArrayInMemoryJS([1, 2, 3, 4]))

function reverseArrayRecursive(arr, start, end) {
    if (start > end) return arr;
    [arr[start], arr[end]] = [arr[end], arr[start]]
    return reverseArrayRecursive(arr, start + 1, end - 1)
}

console.log(reverseArrayRecursive([1, 2, 3, 4], 0, 3))

// Problem Statement: "Given a string, check if the string is palindrome or not."  A string is said to be palindrome if the reverse of the string is the same as the string.

function isPalindromeBF(str) {
    let reversedStr = ""
    for (let i = str.length - 1; i >= 0; i--) {
        reversedStr += str[i];
    }
    return reversedStr === str;
}

console.log(`is kayak a palindrome: ${isPalindromeBF("kayak")}`);
console.log(`is kaddu a palindrome: ${isPalindromeBF("kaddu")}`)

function isPalindromeOptimized(str) {
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - 1 - i]) return false;
    }

    return true
}

console.log(`is kayak a palindrome: ${isPalindromeOptimized("kayak")}`)
console.log(`is kaddu a palindrome: ${isPalindromeOptimized("kaddu")}`);

function isPalindromeRecursive(str, start, end) {
    if (start > end) return true;

    if (str[start] !== str[end]) return false
    return isPalindromeRecursive(str, start + 1, end - 1)
}

console.log(`is kayak a palindrome: ${isPalindromeRecursive("kayak", 0, 4)}`)
console.log(`is kaddu a palindrome: ${isPalindromeRecursive("kaddu", 0, 4)}`);

// Problem Statement: Given an integer N.Print the Fibonacci series up to the Nth term.
// time-> O(n) space-> O(1)
function fibonacciBF(num) {
    let fibonacciArr = [0, 1];
    let i = 2;
    while (i < num) {
        fibonacciArr.push(fibonacciArr[i - 2] + fibonacciArr[i - 1]);
        i++;
    }
    return fibonacciArr;
}

console.log(`Printing fibonacci series of 5: ${fibonacciBF(5)}`);

function fibonacciRecursive(num) {
    if (num <= 1) return num;
    return fibonacciRecursive(num - 1) + fibonacciRecursive(num - 2);
}

console.log(`Printing fibonacci series of 5: ${fibonacciRecursive(5)}`);