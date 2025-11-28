// function step1(error = false) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (!error) {
//                 resolve("✅ Step 1 Success")
//             } else {
//                 reject('❌ Step 1 Failed')
//             }
//         }, 30000)
//     })
// }

// function step2(error = false) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (!error) {
//                 resolve("✅ Step 2 Success")
//             } else {
//                 reject('❌ Step 2 Failed')
//             }
//         }, 1000)
//     })
// }

// function step3(error = false) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (!error) {
//                 resolve("✅ Step 3 Success")
//             } else {
//                 reject('❌ Step 3 Failed')
//             }
//         }, 300)
//     })
// }

// step1()
//     .then((res) => {
//         console.log(res);
//         return step2()
//     })
//     .then((res) => {
//         console.log(res);
//         return step3();
//     })
//     .then((res) => console.log(res))

// with error
// step1()
//     .then((res) => {
//         console.log(res);
//         return step2(true)
//     })
//     .then((res) => {
//         console.log(res);
//         return step3();
//     })
//     .then((res) => console.log(res))
//     .catch((err) => console.error(err))

/* Promise.all(promises) – waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of Promise.all, and all other results are ignored. */

// Promise.all([step1(true), step2(true), step3(true)]).catch(err => console.error(err))


/* Promise.allSettled(promises)(recently added method) – waits for all promises to settle and returns their results as an array of objects with:
status: "fulfilled" or "rejected"
value(if fulfilled) or reason(if rejected). */

// Promise.allSettled([step1(), step2(), step3()])
//     .then((res) => console.log(res))
//     .catch(err => console.error(err))

// Promise.allSettled([step1(), step2(true), step3()])
//     .then((res) => console.log(res))
//     .catch(err => console.error(err))


/* Promise.race(promises) – waits for the first promise to settle, and its result / error becomes the outcome. */


// Promise.race([step1(), step2(), step3()])
//     .then((res) => console.log(res))

// Promise.race([step1(), step2(true), step3(true)])
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

/* Promise.any(promises)(recently added method) – waits for the first promise to fulfill, and its result becomes the outcome.If all of the given promises are rejected, AggregateError becomes the error of Promise.any. */

// Promise.any([step1(), step2(), step3()])
//     .then((res) => console.log(res))

// Promise.any([step1(), step2(true), step3(true)])
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

let a = new Promise((res, rej) => {
    let b = 2 + 2;
    if (b == 3) {
        res("sucess")
    } else {
        rej("failure")
    }
})
a.then(res => console.log("this is using then and it is " + res))
    .catch(res => console.log("this is catch data and it is " + res))