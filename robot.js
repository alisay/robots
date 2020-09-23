const FORBIDDEN = [[1,1],[4,4]];

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
        searchForArray(FORBIDDEN, [x,y]) ? true : this.x = x, this.y = y
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
  
module.exports = Robot;
