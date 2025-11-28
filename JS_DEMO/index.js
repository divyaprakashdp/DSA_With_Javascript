// document.getElementById("clickMe").addEventListener("click", function xyz() {
//     let count = 0
//     console.log("Button clicked", ++count);
// });

function attachEventList() {
    //creating new function for closure
    let count = 0;
    document
        .getElementById("clickMe")
        .addEventListener("click", function xyz() {
            console.log("Button clicked", ++count); //now callback function forms closure with outer scope(count)
        });
}
attachEventList();