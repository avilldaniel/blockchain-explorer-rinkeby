const express = require('express');
const cors = require ('cors');
const { ethers, providers, utils } = require('ethers');
require('dotenv').config();
const port = 1234;  // http://localhost:1234

// create instance of Express
  // Express makes it easy to query data and send HTTP
  // requests from the client to the server
const app = express();

// prevent cross origin errors
  // basically allowing server to receive HTTP requests from client
  // despite having different origins (url's)
app.use(cors());

// parse (JSON -> JS object) incoming JSON requests into req.body
  // built-in middleware in Express
app.use(express.json());

// connect to Alchemy node via app url
const provider = new providers.JsonRpcBatchProvider(process.env.ALCHEMY_URL);

// GET balance of address passed
app.get('/account/:address', async (request, response) => {
  const { address } = request.params;
  const bigNumber = await provider.getBalance(address);
  const balance = utils.formatEther(bigNumber);
  const ethBalance = balance.slice(0, 6);
  response.send({ ethBalance });
})

// GET hash of most recent block mined
app.get('/block', async (request, response) => {
  const lastBlock = await provider.getBlock('latest');
  const lastHash = lastBlock.hash;
  response.send({ lastHash });
})

// GET some averages of last five mined blocks
app.get('/block/lastFive', async (request, response) => {
  const blockHeight = await provider.getBlockNumber();
  let txnCount = [], gasSpent = [];

  for (let i = 0; i < 5; i++) {
    const block = await provider.getBlock(blockHeight - i);

    txnCount.push(block.transactions.length);
    gasSpent.push(block.gasUsed.toNumber())
  }
  const avgTxn = Math.floor(txnCount.reduce((a, b) => a + b, 0) / txnCount.length);  // avg # of txns of last five blocks
  const avgGas = Math.floor((gasSpent.reduce((a, b) => a + b, 0)) / gasSpent.length); // avg gas spent on last five blocks
  response.send({ avgTxn, avgGas });
})

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
})

//  UNIQUE THING: get average # of txns from last 5 mined blocks
  //  OR: avg gas spent from last 5 mined blocks
  //  OR: avg ETH burned from last 5 mined blocks