// Setup
const contacts = [
    {
      firstName: "Akira",
      lastName: "Laine",
      number: "0543236543",
      likes: ["Pizza", "Coding", "Brownie Points"],
    },
    {
      firstName: "Harry",
      lastName: "Potter",
      number: "0994372684",
      likes: ["Hogwarts", "Magic", "Hagrid"],
    },
    {
      firstName: "Sherlock",
      lastName: "Holmes",
      number: "0487345643",
      likes: ["Intriguing Cases", "Violin"],
    },
    {
      firstName: "Kristian",
      lastName: "Vos",
      number: "unknown",
      likes: ["JavaScript", "Gaming", "Foxes"],
    },
  ];
  
  function lookUpProfile(name, prop) {
    // Only change code below this line
    let noSuchName=true;
    let noSuchProp = true;
    for(let i=0;i<contacts.length;i++){
        if(contacts[i]["firstName"]===name && contacts[i].hasOwnProperty(prop)){
            return contacts[i][prop];
        }else if(contacts[i]["firstName"] ===name){
            noSuchName = false;
        }else if(contacts[i].hasOwnProperty(prop)){
            noSuchProp = false;
        }
    }
    if(noSuchName){
        return "No such contact";
    }else if(noSuchProp){
        return "No such property";
    }
    // Only change code above this line
  }
  
  lookUpProfile("Akira", "likes");