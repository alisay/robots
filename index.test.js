const {validateInput} = require('./index');

describe("validateInput function", ()=>{
    test("it strips out nonsensical commands", ()=>{
        const data = ["move", "left", "tuesday"]
        expect(validateInput(data)).toEqual(["move", "left"]);
    })
    test("it removes place commands with invalid arguments", ()=>{
        const data = ["place -1,-1,north", "left", "place 2,2,forth"]
        expect(validateInput(data)).toEqual(["left"]);
    })
    //confirm execution continues after illegal move
})
