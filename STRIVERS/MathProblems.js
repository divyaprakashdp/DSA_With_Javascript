//Problem Statement: Given an integer N, return the number of digits in N.

function countDigitBF(num) {
    console.log("count of digit by brute force");
    let count = 0;
    while (num > 0) {
        count++;
        num = Math.floor(num / 10)

    }
    return count;
}

console.log(countDigitBF(55454))
console.log(countDigitBF(5))

function countDigitByString(num) {
    console.log("By String")
    return ("" + num).length
}
console.log(countDigitByString(55454))
console.log(countDigitByString(5))

function countDigit(num) {
    console.log("count of digit by optimal sol");
    return Math.floor(Math.log10(num)) + 1;
}

console.log(countDigit(55454))
console.log(countDigit(5))

// Problem Statement: Given an integer N return the reverse of the given number.

//     Note: If a number has trailing zeros, then its reverse will not include them.For e.g., reverse of 10400 will be 401 instead of 00401.

function reverseNum(num) {
    console.log(`Reverse of ${num}:`)
    let reverseNum = 0;
    while (num > 0) {
        reverseNum = reverseNum * 10 + (num % 10)
        num = Math.floor(num / 10)
    }
    return reverseNum;
}
console.log(reverseNum(123));

// Problem Statement: Given an integer N, return true if it is a palindrome else return false.
function isPalindrome(num) {
    console.log(`Is ${num} a palindrome:`)
    let reverseNum = 0;
    let temp = num
    while (temp > 0) {
        reverseNum = reverseNum * 10 + (temp % 10)
        temp = Math.floor(temp / 10)
    }
    return num === reverseNum;
}
console.log(isPalindrome(121));
console.log(isPalindrome(1234));

// Problem Statement: Given two integers N1 and N2, find their greatest common divisor(GCD)/highest common factor(HCF).
function gcd(a, b) {
    console.log(`GCD of ${a} and ${b} is: `)
    while (a > 0 && b > 0) {
        if (a > b) {
            a = a % b;
        } else {
            b = b % a;
        }
    }

    if (a === 0) {
        return b;
    }

    return a;
}

console.log(gcd(15, 20));

// Problem Statement: Given an integer N, return true it is an Armstrong number otherwise return false.

// An Amrstrong number is a number that is equal to the sum of its own digits each raised to the power of the number of digits.
//     Example 1:
// Input: N = 153
// Output: True
// Explanation: 13 + 53 + 33 = 1 + 125 + 27 = 153

function isArmstrongNum(num) {
    console.log(`is ${num} an armstrong number:`)
    let temp = num
    let digitCount = Math.floor(Math.log10(num)) + 1;

    let result = 0;

    while (temp > 0) {
        result += Math.pow(temp % 10, digitCount)
        temp = Math.floor(temp / 10)
    }
    return result === num;
}

console.log(isArmstrongNum(153));
console.log(isArmstrongNum(154));

// Problem Statement: Given an integer N, return all divisors of N.

function findDivisors(num) {
    console.log(`divisors of ${num}:`);
    let divisors = [1, num]
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if ((num % i) === 0) {
            divisors.push(i);
            if (i !== num / i) {
                divisors.push(num / i);
            }
        }
    }

    return divisors;
}

console.log(findDivisors(16));
console.log(findDivisors(69));
console.log(findDivisors(23));

// Problem Statement: Given an integer N, check whether it is prime or not.A prime number is a number that is only divisible by 1 and itself and the total number of divisors is 2.

function isPrime(num) {
    console.log(`is ${num} a prime number:`)
    let count = 0;

    for (let i = 2; i <= Math.floor(Math.sqrt(num)) + 1; i++) {
        if ((num % i) === 0) {
            count++
        }
    }
    return count === 0;
}
console.log(isPrime(7107))
console.log(isPrime(7907))