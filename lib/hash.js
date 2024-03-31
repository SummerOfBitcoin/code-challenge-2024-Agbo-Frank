const txn = require("../mempool/000cb561188c762c81f76976f816829424e2af9e0e491c617b7bf41038df3d35.json")
const crypto = require("crypto")

var Hash = module.exports;

Hash.sha256 = function(buf) {
    return crypto.createHash('sha256').update(buf).digest();
};

Hash.sha256sha256 = function(buf) {
    return Hash.sha256(Hash.sha256(buf));
};
