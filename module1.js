const { events, Job, Group } = require('brigadier')

class Myclass{
    
    fun(value) {
    var x = 5;
    return value + x;
    }

}

module.exports = new Myclass();
//module.exports.x = x;
// module.exports.addX = addX;