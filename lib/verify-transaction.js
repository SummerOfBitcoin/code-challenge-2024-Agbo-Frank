
/**
 * the sum of all inputs must be equal to or greater than the sum of all outputs
 */

async function verify(txn = testdata){
    if(txn.vin.length === 0){
        throw new Error("'transaction input is empty'")
    }
    if(txn.vout.length === 0){
        throw new Error("'transaction output is empty'")
    }

    const dupinput = {}
    for (let i = 0; i < txn.vin.length; i++) {
        let key = txn.vin[i].txid + ":" + txn.vin[i].vout

    }

    for (var i = 0; i < txn.vout.length; i++) {
        var txout = txn.vout[i];
    
        if (txout.value < 1) {
            throw new Error("transaction output is empty")
        }
    }

    for (let i = 0; i < txn.vin.length; i++) {
        await validateTxnInput(txn.vin[i].txid)
    }
}