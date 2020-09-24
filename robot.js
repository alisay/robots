const FORBIDDEN = [[1,1],[4,4]];
const COORDS = {x: [0,4], y: [0,4]};

class Robot {
    place(xyf){
            this.x = xyf[0];
            this.y = xyf[1];
            this.f = xyf[2];       
    }

    move(){
        let x = this.x
        let y = this.y    
        switch (this.f){
            case "north":
                y++ 
                break;
            case "south":
                y--
                break;
            case "east":
                x++
                break;
            case "west":
                x--
                break;
            default:
                "invalid input";
        }
        !searchForArray(FORBIDDEN, [x,y]) && (boardRange(x,y)) ? (this.x = x, this.y = y) : true
    }

    rotate(direction, cardinals){
        let index = cardinals.indexOf(this.f);
        if(direction === "left"){
            index = ((index-1)+4)% 4;
        } 
        else if (direction === "right"){
            index = (index+1)% 4;
        }
        this.f = cardinals[index];
    }

    report(){
        if(!this.f){
            return "robot has not been placed";
        }
        return `${this.x}, ${this.y}, ${this.f.toUpperCase()}`; //announce the X,Y and F of the robot
    }
}

const boardRange = (x, y)=>{
    return (x >= COORDS.x[0] && x <= COORDS.x[1]) && (y >= COORDS.y[0] && y <= COORDS.y[1]);
}

function searchForArray(maze, coords){
    let i, j, current;
    for(i = 0; i < maze.length; ++i){
      if(coords.length === maze[i].length){
        current = maze[i];
        for(j = 0; j < coords.length && coords[j] === current[j]; ++j);
        if(j === coords.length)
          return true;
      }
    }
    return false;
  }
  
module.exports = {Robot, boardRange};
