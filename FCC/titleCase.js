function titleCase(str) {
    str.toLowerCase();
    let arr = str.split(" ")
    for(let i=0;i<arr.length;i++){
        arr[i] = arr[i].replace(arr[i][0], arr[i][0].toUpperCase());
    }
    return arr.join(" ")
  }
  
  console.log(titleCase("I'm a little tea pot"));