const axios = require('axios');

const apiClient = axios.create({
  baseURL: "http://localhost:1234",
  // timeout: 5000,
  // headers: {}
})

module.exports = {apiClient};

// GET balance of address passed: /account/:address
// GET hash of most recent block mined: /block
// GET some averages of last five mined blocks: /block/lastFive