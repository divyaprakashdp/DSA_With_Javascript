function selectionSort(arr) {
    let length = arr.length;
    for (let i = 0; i < length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }

    return arr;
}

console.log(selectionSort([99, 44, 64, 6, 0]));