
function int_to_little_endian(n, length) {
    const buf = Buffer.alloc(length);
    buf.writeUIntLE(n, 0, length);
    return buf;
}

function encode_varint(i) {
    if (i < 0xfd) {
        return int_to_little_endian(i, 1);
    } else if (i < 0x10000) {
        return Buffer.concat([Buffer.from([0xfd]), int_to_little_endian(i, 2)]);
    } else if (i < 0x100000000) {
        return Buffer.concat([Buffer.from([0xfe]), int_to_little_endian(i, 4)]);
    } else {
        return Buffer.concat([Buffer.from([0xff]), int_to_little_endian(i, 8)]);
    }
}

function serialize_input(tx_input) {
    return Buffer.concat([
        Buffer.from(tx_input.txid, 'hex').reverse(),
        int_to_little_endian(tx_input.vout, 4),
        encode_varint(tx_input.scriptsig.length),
        tx_input.scriptsig,
        int_to_little_endian(tx_input.sequence, 4)
    ]);
}

function serialize_output(tx_output) {
    return Buffer.concat([
        int_to_little_endian(tx_output.value, 8),
        encode_varint(tx_output.scriptpubkey_asm.length),
        tx_output.scriptpubkey_asm
    ]);
}

function serialize_transaction(transaction) {
    return Buffer.concat([
        int_to_little_endian(transaction.version, 4),
        encode_varint(transaction.vinp.length),
        Buffer.concat(transaction.vin.map(serialize_input)),
        encode_varint(transaction.vout.length),
        Buffer.concat(transaction.vout.map(serialize_output)),
        int_to_little_endian(transaction.locktime, 4)
    ]);
}

const serialized_tx = serialize_transaction(transaction);
console.log("Serialized Transaction:", serialized_tx.toString('hex'));
