import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { useState } from "react";
import { signMessage } from "../scripts/sign";
import server from "./server";

function Transfer({ pvKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  //call each setSendAmount or setRecipient when needed
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    //Sign the message and send the data to the server
    const messageSign = signMessage(sendAmount, pvKey);
    const pbKey = toHex(secp256k1.getPublicKey(pvKey));

    const requestPayload = {
      recipient,
      signature: messageSign.toCompactHex(),
      data: sendAmount,
      sender: pbKey,
    };

    try {
      const { data: { newBalance } } = await server.post(`send`, requestPayload);

      //update the current balance
      setBalance(newBalance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient <input
          placeholder="Type an address, for example: 0x23f45ab2..."
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
