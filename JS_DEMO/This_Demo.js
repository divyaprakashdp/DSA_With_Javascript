// let arr = [1, 2, 3, 4, 5]
// console.log(arr.splice(1, 2, 3))
// console.log(arr)
//---------closers----------
function outer() {
    let count = 0
    return function inner() {
        count++
        console.log("Counter:", count);
    }
}
console.log(outer())

let a = outer()
a()
a()
a()
let b = outer()
b()
let arr = [1, 2, 3, 4, 5]
let res = arr.splice(1, 4)
console.log(arr)
console.log(res)

main1()
main2()
main3()

var main1 = function () {
    console.log("this is expression with var")
}

let main2 = function () {
    console.log("this is expression with let")
}

const main3 = function () {
    console.log("this is expression with const")
}

