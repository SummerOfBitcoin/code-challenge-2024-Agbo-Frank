const fs = require('fs');
const path = require('path');

module.exports = function getTransactions(){
    const dir_path = "mempool"
    try{
        const files = fs.readdirSync(dir_path)

        return files.map(file => {
            const data = fs.readFileSync(path.join(dir_path, file), 'utf8')
            return JSON.parse(data)
        })
    }
    catch(err){
        throw err
    }
}