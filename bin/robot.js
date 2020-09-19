class Robot {
    place(xyf){
        this.x = xyf[0]
        this.y = xyf[1]
        this.f = xyf[2]    
    }

    move(){//deal with movign off the board
        switch (this.f){
            case "north":
                this.y++;
                break;
            case "south":
                this.y--;
                break;
            case "east":
                this.x++;
                break;
            case "west":
                this.x--;
                break;
            default:
                "invalid input";
        }
    }

    left(){
        const f=["north","east","south","west"]
        const index = ((f.indexOf(this.f)-1)+4)% 4
        this.f = f[index];
    }

    right(){
        const f=["north","east","south","west"]
        const index = ((f.indexOf(this.f)+1)% 4)
        this.f = f[index];
    }

    report(){
        console.log(`${this.x}, ${this.y}, ${this.f.toUpperCase()}`);//announce the X,Y and F of the robot
    }
}

module.exports = Robot;
