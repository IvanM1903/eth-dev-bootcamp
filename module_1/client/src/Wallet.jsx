import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { useState } from "react";
import server from "./server";

function Wallet({ pvKey, setPvKey, balance, setBalance }) {
  //public key data
  const [pbKey, setPbKey] = useState('');

  async function onChange(evt) {
    //update private key
    const newPvKey = evt.target.value;
    setPvKey(newPvKey);

    try {
      //try to find the public key from the private one
      const newPbKey = toHex(secp256k1.getPublicKey(newPvKey));
      setPbKey(newPbKey);

      if (newPbKey) {
        //update the balance to be displayed
        const { data: { balance } } = await server.get(`balance/${newPbKey}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } catch (ex) {
      setPbKey(null);
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key <input placeholder="Type your private key" value={pvKey} onChange={onChange}></input>
      </label>
      {!pbKey ?
        <div style={{ fontSize: '12px', color: 'rgba(255, 0, 0, 0.7)', fontWeight: 'bold' }}>Invalid Private Key</div> :
        <div style={{ fontSize: '12px', color: 'rgba(0, 125, 0, 0.7)', fontWeight: 'bold' }}>Valid Private Key</div>}
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
