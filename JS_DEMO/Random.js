//input
let arr = [{
    c: "India",
    s: "KA"
}, {
    c: "India",
    s: "OD"
}, {
    c: "India",
    s: "MH"
}, {
    c: "US",
    s: "Washington"
}, {
    c: "China",
    s: "Beijing"
}]

function getStates(arr, country) {
    let indArr = arr.filter(con => con.c === country)

    let res = indArr.map(indState => indState.s)
    console.log([country, ...res])
}

getStates(arr, "US")