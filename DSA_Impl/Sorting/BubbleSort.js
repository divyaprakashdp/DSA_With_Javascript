function bubbleSort(arr) {
    const length = arr.length;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }

    return arr
}

let inputArray = [99, 44, -62, 300, -1, 0]

console.log(bubbleSort(inputArray))