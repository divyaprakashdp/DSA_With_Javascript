function confirmEnding(str, target) {
    console.log(str.slice(str.length-target.length))
    return str.slice(str.length-target.length)===target
  }
  
  console.log(confirmEnding("Congratulation", "on"));