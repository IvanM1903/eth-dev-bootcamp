import { useState } from "react";
import "./App.scss";
import Transfer from "./Transfer";
import Wallet from "./Wallet";

function App() {
  const [balance, setBalance] = useState(0);
  const [pvKey, setPvKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        pvKey={pvKey}
        setPvKey={setPvKey}
      />
      <Transfer setBalance={setBalance} pvKey={pvKey} />
    </div>
  );
}

export default App;
