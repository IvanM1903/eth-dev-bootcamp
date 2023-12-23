const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();

async function main() {
  const name = process.argv[2] || "Shelly Toy";
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name
  });

  console.log({ gift });
}

main();