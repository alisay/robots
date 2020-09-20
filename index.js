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
    if(!input){
        return false;
    }
    //return text in file as an array split by line
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

    //find commands which are of a valid format
    const validCommands = data.filter(element=>commands.includes(element) || element.startsWith("place"))
    
    const integers = ["0","1","2","3","4"];
    const cardinals = ["north", "south", "east", "west"];
    
    //find PLACEs with invalid arguments
    const invalidPlaces = validCommands
            .filter(command=>command.startsWith("place"))//identify place commands
            .map(placeCommand=> placeCommand.slice(6).split(",")) //create sub arrays of place arguments
            .filter(placeArguments=>!(integers.includes(placeArguments[0], placeArguments[1]) && cardinals.includes(placeArguments[2])));

    //find the index of those invalid PLACEs in the orignal valid commands array
    const indexOfInvalidPlaces = invalidPlaces
            .map(placeArguments=>placeArguments.join())//turn arguments back into a string
            .map(argumentString=>validCommands.indexOf(`place ${argumentString}`));//find the index in original array 

    //modify original valid commands array to remove invalid PLACEs
    indexOfInvalidPlaces
            .reduceRight((_, item) => validCommands.splice(item,1), null);

    return validCommands;
    }

const ignoreStart = (data)=>{
    if(!data){
        return false;
    }
    const firstPlace = data.findIndex(element=> element.startsWith('place'));//find the index of the first PLACE command
    return data.splice(firstPlace);//return commands from the first PLACE onwards
}

const executeCommands = (data)=>{
    if(!data){
        return false;
    }

    for (let index = 0; index < data.length; ++index){
        if (data[index] === "move") roboguy.move();
        if (data[index] === "left") roboguy.rotate("left");
        if (data[index] === "right") roboguy.rotate("right");
        if (data[index] === "report") console.log(roboguy.report());
        if (data[index].startsWith("place")) roboguy.place(data[index].slice(6).split(","));
    }
}

executeCommands(ignoreStart((validateInput(parseInput(readInput())))));

module.exports = {validateInput};

