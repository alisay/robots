class Robot {
    place(xyf){
            this.x = xyf[0];
            this.y = xyf[1];
            this.f = xyf[2];       
    }

    move(){
        switch (this.f){
            case "north":
                if (this.y<4){
                this.y++;
                }
                break;
            case "south":
                if (this.y>0){
                    this.y--;
                }
                break;
            case "east":
                if (this.x<4){
                    this.x++;
                }
                break;
            case "west":
                if (this.x>0){
                    this.x--;
                }
                break;
            default:
                "invalid input";
        }
    }

    rotate(direction){
        const f=["north","east","south","west"];
        let index = f.indexOf(this.f);
        if(direction === "left"){
            index = ((index-1)+4)% 4;
        } 
        else if (direction === "right"){
            index = (index+1)% 4;
        }
        this.f = f[index];
    }

    report(){
        return `${this.x}, ${this.y}, ${this.f.toUpperCase()}`; //announce the X,Y and F of the robot
    }
}

module.exports = Robot;
