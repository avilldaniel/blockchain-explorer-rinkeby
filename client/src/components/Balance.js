import { useState } from "react";
import { apiClient } from "../apiClient";

// GET balance of address passed: /account/:address
// test: 0xa211B3aFd98f704015e8761F18C9C00D8bEc8697

function Balance() {
  const [addy, setAddy] = useState(""); // state which handles address input
  const [showBalance, setShowBalance] = useState(false);  // show balance iff an address has been entered
  const [balance, setBalance] = useState(0);

  const getBalance = async (e) => {
    e.preventDefault();
    const response = await apiClient.get(
      `/account/${addy}`
    );
    setBalance(response.data.ethBalance);
    setShowBalance(true);
  };

  const displayBalance = () => {
    if (showBalance) {
      return (
        <h3>Balance: ~ {balance} ETH</h3>
      )
    }
  }

  return (
    <>
      <h2>Get balance of an address</h2>

      <form onSubmit={getBalance}>
        <input type="text" onChange={e => setAddy(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {displayBalance()}
    </>
  );
}

export default Balance;
