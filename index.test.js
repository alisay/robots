const {validateInput} = require('./index');

describe("validate function", ()=>{
    test("it strips out nonsensical commands", ()=>{
        const data = ["move", "left", "tuesday"]
        expect(validateInput(data)).toEqual(["move", "left"]);
    })
    test("it removes place commands with invalid arguments", ()=>{
        const data = ["place 3", "left", "place 2,2,forth"]
        expect(validateInput(data)).toEqual(["left"]);
    })
})
