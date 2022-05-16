import { useEffect, useState } from "react";
import { apiClient } from "../apiClient";

// GET hash of most recent block mined: /block

const LatestBlock = () => {
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // create function which will fetch data from API
    const fetchData = async () => {
      const response = await apiClient.get('/block');
      console.log(response.data)
      setLoading(false);
      setHash(response.data.lastHash);
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
      <h2>Hash of last block mined: {loading ? 'loading..' : hash}</h2>
    </>
  );
};

export default LatestBlock;