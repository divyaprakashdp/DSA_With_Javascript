function seekAndDestroy(arr, ...values){
    return arr.filter(elem => !values.includes(elem));
}

console.log(seekAndDestroy([1,2,3,1,2,3], 2, 3))