function countdown(n){
    if(n<1){
      return [];
    }else{
        var countArray =countdown(n-1)
        countArray.unshift(n);
        return countArray
    }
    
  }

  console.log(countdown(10))