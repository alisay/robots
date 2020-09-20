const Robot = require("./robot");
const fs = require('fs');

const roboguy = new Robot();

const readInput = ()=>{
    const inputFile = process.argv[2];
    if(!inputFile){
        return false;
    }
    return fs.readFileSync(inputFile,'utf8');
}

const parseInput = (input) =>{
    //return text in file as an array split by line
    if(!input){
        return false;
    }
    return input
        .toLowerCase()
        .split(/\n/)
        .map(datum=>datum.trim());
    }

const validateInput = (data)=>{
    if(!data){
        return false;
    }
    const commands = ['move', 'right', 'left', 'report']

    const valid = data.filter(element=>commands.includes(element) || element.startsWith("place"))
    
    const integers = ["0","1","2","3","4"];
    const cardinals = ["north", "south", "east", "west"];
    
    const invalidPlaces = valid
                    .filter(element=>element.startsWith("place"))//identify place commands
                    .map(element=> element.slice(6).split(",")) //create sub arrays of place arguments
                    .filter(element=>!(integers.includes(element[0], element[1]) && cardinals.includes(element[2])))
                    .map(element=>element.join())
                    .map(element=>valid.indexOf(`place ${element}`))//find the index in original array 
                    .reduceRight((__,item)=>valid.splice(item,1), null);//remove invalid items from original array

    return valid;
}

const executeCommands = (data)=>{
    if(!data){
        return false;
    }
    //identify the first place command
    const startingIndex = data.findIndex(element=> element.startsWith('place'));

    //execute all commands, beginning with first place
    for (let index = startingIndex; index < data.length; ++index){
        let element = (data[index]);
        switch(element){
            case "move":
                roboguy.move();
                break;
            case "left":
                roboguy.rotate("left");
                break;
            case "right":
                roboguy.rotate("right");
                break;
            case "report":
                    console.log(roboguy.report());
                    break;
            default:
                if (element.startsWith("place")){
                    const args = element.slice(6).split(",");
                    roboguy.place(args);
                }
        }
    }
}

executeCommands((validateInput(parseInput(readInput()))));

module.exports = {validateInput};

