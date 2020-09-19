const Robot = require("./robot");
const roboguy = new Robot();
const parsedData = [ 'place 1,2,east', 'move', 'move', 'right', 'move', 'report', '' ]
const startingIndex = parsedData.findIndex(element=> element.startsWith('place'));

const doIt = ()=>{
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
            case "report":
                roboguy.report();
                break;    
            default:
                if (element.startsWith("place")){
                    arguments = element.slice(6).split(",")
                    roboguy.place(arguments)
                }
                "out of moves"
        }
    }
}

doIt();