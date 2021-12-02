const sum = (...inp) => {
    const args = [];
    for(let i=0;i<inp.length;i++){
        args.push(inp[i])
    }
    return args.reduce((a, b) => a + b, 0);
  }

  console.log(sum(0,1,2))