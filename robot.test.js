const Robot = require('./robot');

describe("Robot", ()=>{
    let r = new Robot();
    let x, y, f;

    const report = ()=>`${r.x}, ${r.y}, ${r.f}`;

    beforeEach(()=>{
        x = 0;
        y = 0;
        f = "north";
    });

    describe("place method", ()=>{
        const place = ()=>{
            r.place([x,y,f]);
            return report();
        };
        test("it should be placed in the correct location", ()=>{
            expect(place()).toEqual("0, 0, north");
        });
    });

    describe("move method", ()=>{
        const move = () => {
            r.place([x,y,f]);
            r.move()
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
        const rotate = ()=>{
            r.place([x,y,f]);
            r.rotate(direction);
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
            r.place([x,y,f]);
            return r.report();
        };
        test("it should report in correct format", ()=>{
            expect(report()).toEqual("0, 0, NORTH");
        });
    });

})

