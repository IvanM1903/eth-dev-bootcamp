const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");

const express = require("express");
const app = express();
const cors = require("cors");
const { getHashedData, getAddress } = require("./scripts/generate");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "fb66b67fa4b00f58dd3dadf6ccd210e6edb6c071": 100,
  "cd5cc1dd41e7c5859670a1fc2dbb5d1d7d8485f9": 50,
  "39ec866452424188732d4c7b2808f2578254df97": 75,
};

app.get("/balance/:pbKey", (req, res) => {
  const { pbKey } = req.params;
  const address = getAddress(pbKey);
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, sender, recipient, data } = req.body;
  try {
    //verify the signature
    const verified = secp256k1.verify(signature, getHashedData(data), sender);
    if (!verified) {
      res.status(400).send({ message: "Invalid signature" });
      return;
    }

    //verify the recipient exists
    if (!Object.keys(balances).includes(recipient)) {
      res.status(400).send({ message: "The recipient does not exist" });
      return;
    }

    //set address from the public key received and the recipient
    const senderAddress = getAddress(sender);

    //set default values to each address
    setInitialBalance(senderAddress);
    setInitialBalance(recipient);

    //perform the transfer
    if (balances[senderAddress] < data) {
      res.status(400).send({ message: "Not enough funds!" });
      return;
    }

    balances[senderAddress] -= data;
    balances[recipient] += data;

    res.send({ newBalance: balances[senderAddress] });

  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: "There was an unexpected error" });
  }


  return res.send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
