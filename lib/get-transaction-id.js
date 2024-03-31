const serialize = require("./serialize");
const crypto = require("crypto")

function sha256(data) {
    return crypto.createHash('sha256').update(data).digest("hex");
};

module.exports = function getTxnId(data){
    const tx = serialize(data)

    return sha256(sha256(tx))
}