const getTransactionId = require("./lib/get-transaction-id")
const getTransactions = require("./lib/get-transactions")
const print = require("./lib/print")

/**
 * Verify the transaction 
 * Serialized the verifed transaction 
 * get the merkle root of the block
 * get the serializr block header 
 */
const txns = getTransactions()
const txn_ids = txns.map(txn => getTransactionId(txn))
console.log(txn_ids)
print(txn_ids)