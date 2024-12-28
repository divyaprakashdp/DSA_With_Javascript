function checkRotation(str1, str2) {
    if (str1.length !== str2.length) return;
    for (let i = 0; i < str2.length; i++) {
        let indexTocheck = str1.find(str2[i]);
        if (str1[length - indexTocheck - 1] === str2[i + 1]) {
            continue;
        } else {
            return false
        }
    }
    return true;
}

console.log(checkRotation("abc", "cab"))

function rotateL2RString(str, rotateX) {
    //divya



    let strArr = str.split("");
    let length = strArr.length

    let slicedArray1 = strArr.slice(strArr.length - rotateX);
    let slicedArray2 = strArr.slice(0, strArr.length - rotateX);
    return [...slicedArray1, ...slicedArray2];
    // console.log(strArr[strArr.length - rotateX])
}

// console.log(rotateL2RString("divya", 5))

// divya vyadi

function rotateR2LString(str, rotateX) {
    //divya
    //ivya d
    //vya di

    let strArr = str.split("");
    let length = strArr.length

    let slicedArray2 = strArr.slice(0, rotateX);
    let slicedArray1 = strArr.slice(rotateX);
    return [...slicedArray1, ...slicedArray2];
    // console.log(strArr[strArr.length - rotateX])
}


console.log(rotateR2LString("divya", 5))

function checkRotation(str1, str2) {
    if (str1.length !== str2.length) return;

    for (let i = 1; i <= str2.length; i++) {
        let l2r = rotateL2RString(str2, i).join("");
        let r2l = rotateR2LString(str2, i).join("");

        if (str1 === l2r || str1 == r2l) {
            return true
        }
    }
    return false;
}

console.log(checkRotation("divya", "aidvy"));