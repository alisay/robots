#!/usr/bin/env node

const Robot = require("./robot");
fs = require('fs');

const roboguy = new Robot();
const inputFile = process.argv[2];

const takeCommand = (file)=>{
    fs.readFile(file, 'utf8', (err,data)=>{
        if(err){
            console.log(err);
        }
        parsedData = data
            .toLowerCase()
            .split(/\n/)
            .map(datum=>datum.trim());
        console.log(parsedData);

        const startingIndex = parsedData.findIndex(element=> element.startsWith('place'));

        for (let index = startingIndex; index < parsedData.length; ++index){
            let element = (parsedData[index]);
            switch(parsedData[index]){
                case "move":
                    roboguy.move();
                    break;
                case "left":
                    roboguy.left();
                    break;
                case "right":
                    roboguy.right();
                    break;
                default:
                    if (element.startsWith("place")){
                        const arguments = element.slice(6).split(",")
                        roboguy.place(arguments)
                    }
                    "out of moves"
            }
        }
    });    
}


takeCommand(inputFile);

