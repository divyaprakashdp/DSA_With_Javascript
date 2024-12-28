function pattern1(row) {
    let output = ""
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < row; j++) {
            output += "* "
        }
        console.log(output)
        output = ""
    }
}
console.log("#####pattern1#####")
pattern1(4);


function pattern2(row) {
    let output = ""
    for (let i = 0; i < row; i++) {
        for (let j = 0; j <= i; j++) {
            output += "* "
        }
        console.log(output)
        output = ""
    }
}

console.log("#####pattern2#####")
pattern2(4);

function pattern3(row) {
    let output = ""
    for (let i = 0; i < row; i++) {
        for (let j = 0; j <= i; j++) {
            output += j + 1 + " "
        }
        console.log(output)
        output = ""
    }
}

console.log("#####pattern3#####")
pattern3(4);

function pattern4(row) {
    let output = ""
    for (let i = 0; i < row; i++) {
        for (let j = 0; j <= i; j++) {
            output += i + 1 + " "
        }
        console.log(output)
        output = ""
    }
}

console.log("#####pattern4#####")
pattern4(4);

function pattern5(row) {
    let output = ""
    for (let i = 0; i < row; i++) {
        for (let j = row; j > i; j--) {
            output += "* "
        }
        console.log(output)
        output = ""
    }
}

console.log("#####pattern5#####")
pattern5(4);

function pattern6(row) {
    let output = ""
    for (let i = 0; i < row; i++) {
        for (let j = row; j > i; j--) {
            output += row - j + 1 + " "
        }
        console.log(output)
        output = ""
    }
}
console.log("#####pattern6#####")
pattern6(4);

function pattern7(row) {
    let output = ""
    for (let i = 0; i < row; i++) {
        for (let j = row; j > i; j--) {
            output += " "
        }
        for (let j = 0; j <= i; j++) {
            output += "* "
        }
        console.log(output)
        output = ""
    }
}

console.log("#####pattern7#####")
pattern7(4);

function pattern8(row) {
    let output = ""
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < i; j++) {
            output += " "
        }
        for (let j = row; j > i; j--) {
            output += "* "
        }

        console.log(output)
        output = ""
    }
}
console.log("#####pattern8#####")
pattern8(4);

function pattern9(row) {
    let output = ""
    for (let i = 0; i < row; i++) {
        if (i <= row / 2) {
            for (let j = row; j > i; j--) {
                output += " "
            }
            for (let j = 0; j <= i; j++) {
                output += "* "
            }
            console.log(output)
            output = ""
        } else {
            for (let j = 0; j <= i; j++) {
                output += " "
            }
            for (let j = row; j > i; j--) {
                output += "* "
            }

            console.log(output)
            output = ""
        }
    }
}

console.log("#####pattern9#####")
pattern9(7);

function pattern10(row) {
    let output = ""
    for (let i = 0; i < row; i++) {
        if (i <= row / 2) {
            for (let j = 0; j <= i; j++) {
                output += "* "
            }
            console.log(output)
            output = ""
        } else {
            for (let j = row; j > i; j--) {
                output += "* "
            }

            console.log(output)
            output = ""
        }
    }
}

console.log("#####pattern10#####")
pattern10(7);