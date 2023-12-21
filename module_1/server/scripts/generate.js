const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getHashedData(message) {
    const messageBytes = utf8ToBytes(message);
    return keccak256(messageBytes);
}

function getAddress(publicKey) {
    const keyFormat = publicKey.slice(0, 1);
    const keyHashed = keccak256(Uint8Array.from(publicKey.slice(1)));

    return toHex(keyHashed.slice(-20));
}

module.exports = {
    getHashedData,
    getAddress
}