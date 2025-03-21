// Selection sort
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr;
}

console.log(`Selection sort of [88, 33, 1, 7, 102, 5] => ${selectionSort([88, 33, 1, 7, 102, 5])}`);

// bubble sort
function bubbleSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }

    return arr;
}

console.log(`bubbleSort of [88, 33, 1, 7, 102, 5] => ${bubbleSort([88, 33, 1, 7, 102, 5])}`);

// insertion sort
function insertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
            j--;
        }
    }
    return arr;
}

console.log(`insertionSort of [88, 33, 1, 7, 102, 5] => ${insertionSort([88, 33, 1, 7, 102, 5])}`);