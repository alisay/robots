#!/usr/bin/env node

const Robot = require("./robot");
fs = require('fs');

const roboguy = new Robot();
const inputFile = process.argv[2];

const takeInput= (file)=>{
    fs.readFile(file, 'utf8', (err,data)=>{
        if(err){
            console.log(err);
        }
        //return text in file as an array split by line
        parsedData = data
            .toLowerCase()
            .split(/\n/)
            .map(datum=>datum.trim());

        //identify the first place command
        const startingIndex = parsedData.findIndex(element=> element.startsWith('place'));

        //execute all commands, beginning with first place
        for (let index = startingIndex; index < parsedData.length; ++index){
            let element = (parsedData[index]);
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
                        const arguments = element.slice(6).split(",");
                        roboguy.place(arguments);
                    }
            }
        }
    });    
}


takeInput(inputFile);

