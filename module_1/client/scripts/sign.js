import { keccak256 } from 'ethereum-cryptography/keccak';
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { utf8ToBytes } from 'ethereum-cryptography/utils';

export function signMessage(data, privateKey) {
    return secp256k1.sign(hashMessage(data), privateKey, { recovery: 1 });
}

export function hashMessage(message) {
    const messageBytes = utf8ToBytes(message);
    return keccak256(messageBytes);
}

/**
 * d9f9eba560b2098d77b2a115411e7cc140ecf0c7f953a893b276bbaa24d606bd
 * 
 * 0223c1ce96cbbca3cd1c0838c78922795f2e2e94c5db2c0eda4fcde9aeddda5eae
 * 02e835ab5431e232ebec3660e9a6a325f9c9c827366e1bad24641854072588db2a
 * 02d23b1bc5bc067af37e136597d067e4a7e1a70f588a1ea71d80728bc761e77e0a
 */
