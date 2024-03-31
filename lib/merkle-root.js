const crypto = require("crypto")
const getTransactions = require("./get-transactions")

function sha256(data) {
    return crypto.createHash('sha256').update(data).digest();
}

function calculateMerkleRoot(transactions = getTransactions()){
    const hashes = transactions.map(txn => sha256(JSON.stringify(txn)))

    function recursiveMerkle(hashes) {
        if (hashes.length === 1) {
            return hashes[0];
        }
        const newHashes = [];
        for (let i = 0; i < hashes.length; i += 2) {
            const left = hashes[i];
            const right = (i + 1 < hashes.length) ? hashes[i + 1] : left;
            const concatenated = Buffer.concat([left, right]);
            const combinedHash = sha256(concatenated);
            newHashes.push(combinedHash);
        }
        return recursiveMerkle(newHashes);
    }

    return recursiveMerkle(hashes).toString('hex')
}
