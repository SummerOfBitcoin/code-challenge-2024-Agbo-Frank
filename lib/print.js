const fs = require('fs');

module.exports = function print(txids){
    try {
        const string = `${txids}`;

        fs.appendFileSync('output.txt', string)
    } catch (error) {
        console.log(error)
    }
}