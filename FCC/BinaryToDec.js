function convertToInteger(str) {
  let out = 0;
  for(let i=str.length;i>0;i--){
      out += parseInt(str[i-1])* (2**(str.length-i));
  }
  return out;
  
}

console.log(convertToInteger("10011"));