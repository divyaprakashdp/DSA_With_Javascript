function findLongestWordLength(str) {
    let globalCount = 0;
    for(let i =0;i<str.length;i++){
      let localCount = 0;
      if(str[i]!==' '){
        localCount++
      }else if (str[i]===' '){
        if(globalCount<localCount){
          globalCount = localCount
        }
      }
    }
    if(globalCount<localCount){
        globalCount = localCount
      }
    console.log(globalCount)
    return globalCount;
  }
  
  findLongestWordLength("The quick brown fox jumped over the lazy dog");