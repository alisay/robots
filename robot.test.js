const Robot = require('./robot');

describe("Robot", ()=>{
    let robot = new Robot();
    let x, y, f;

    const report = ()=>`${robot.x}, ${robot.y}, ${robot.f}`;

    beforeEach(()=>{
        x = 0;
        y = 0;
        f = "north";
    });

    describe("place method", ()=>{
        const place = ()=>{
            robot.place([x,y,f]);
            return report();
        };
        test("it should be placed in the correct location", ()=>{
            expect(place()).toEqual("0, 0, north");
        });
    });

    describe("move method", ()=>{
        const move = () => {
            robot.place([x,y,f]);
            robot.move()
            return report();
        };
        test("it should move in the correct direction", ()=>{
            expect(move()).toEqual("0, 1, north");
        });
        test("it should not move outside the map", ()=>{
            f = "south";
            expect(move()).toEqual("0, 0, south");
        });
    })

    describe ("rotate method", ()=>{
        let direction;
        let cardinals = ["north", "south", "east", "west"]
        const rotate = ()=>{
            robot.place([x,y,f]);
            robot.rotate(direction, cardinals);
            return report();
        };
        test("it should rotate clockwise", ()=>{
            direction = "right";
            f = "west"
            expect(rotate()).toEqual("0, 0, north");
        });
        test("it should rotate anti-clockwise", ()=>{
            direction = "left";
            expect(rotate()).toEqual("0, 0, west");
        });
    });

    describe ("report method", ()=>{
        const report = ()=>{
            robot.place([x,y,f]);
            return robot.report();
        };
        test("it should report in correct format", ()=>{
            expect(report()).toEqual("0, 0, NORTH");
        });
    });

})

