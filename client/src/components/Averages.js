import { useEffect, useState } from "react";
import { apiClient } from "../apiClient";

// GET some averages of last five mined blocks: /block/lastFive

const Averages = () => {
  const [avgTxns, setAvgTxns] = useState(0);
  const [avgGas, setAvgGas] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // create function which will fetch data from API
    const fetchData = async () => {
      const response = await apiClient.get('/block/lastFive');
      // console.log(response.data)
      setLoading(false);
      setAvgTxns(response.data.avgTxn);
      setAvgGas(response.data.avgGas);
    }

    // run fetch, and catch error if request fails
    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [])
  

  return (
    <>
      <h2>Last five blocks mined:</h2>

      <ul>
        <li>Average number of transactions: {loading ? 'loading..' : avgTxns}</li>
        <li>Average amount of gas used: {loading ? 'loading..' : avgGas} </li>
      </ul>
    </>
  );
};

export default Averages;
