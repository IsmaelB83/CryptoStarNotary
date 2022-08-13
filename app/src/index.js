// Node imports
import Web3 from "web3";
// Own imports
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

// Types
const NETWORKS = {
    "1": "Mainnet",
    "3": "Ropsten",
    "4": "Rinkeby",
    "5": "Goerli",
    "42": "Kovan",
    "1337": "Ganache"
}

// Inputs
const inputStarName = document.getElementById('inputStarName');
const inputStarSymbol = document.getElementById('inputStarSymbol');
const inputStarId = document.getElementById('inputStarId');
const inputAddress = document.getElementById('inputAddress');
// Labels
const labelNetwork = document.getElementById('labelNetwork');
const labelAccount = document.getElementById('labelAccount');
// Web3
let web3;
let account;
let meta;

// App
const App = {

  start: async () => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = starNotaryArtifact.networks[networkId];
    meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
    );
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
  },

  connectMetamask: () => {
    web3 = new Web3(window.ethereum);
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => web3.eth.getChainId().then(chainId => {
        web3.eth.defaultAccount = accounts[0].toLowerCase();
        labelAccount.innerHTML = accountShort(accounts[0].toLowerCase());
        labelNetwork.innerHTML = NETWORKS[chainId]   
    }))
    .catch(error => {
        App.setStatus(`Error connecting: ${error.toString()}`);
    });
  },

  setStatus: function(message) {
    const status = document.getElementById("labelStatus");
    status.innerHTML = message;
  },

  searchStar: async () => {
    const { lookUptokenIdToStarInfo } = meta.methods;
    const tokenId = inputStarId.value;
    const star = await lookUptokenIdToStarInfo(parseInt(tokenId)).call();
    if (star.name) {
        inputStarName.value = star.name;
        inputStarSymbol.value = star.symbol;
        App.setStatus(`Star owner is ${accountShort(star.owner.toLowerCase())}`);

    } else {
        App.setStatus(`Star ${tokenId} not found`);
    }
  },

  createStar: async () => {
    const { createStar } = meta.methods;
    const name = inputStarName.value;
    const id = inputStarId.value;
    const symbol = inputStarSymbol.value;
    const tx = await createStar(name, parseInt(id), symbol).send({from: account});
    if (tx) {
        App.setStatus(`New Star owner is ${account}`);
    }
  },

  transferStar: async () => {
    const { transferStar } = meta.methods;
    const toAddress = inputAddress.value;
    const id = inputStarId.value;
    const tx = await transferStar(toAddress, id).send({from: account});
    if (tx) {
        App.setStatus(`New Star owner is ${toAddress}`);
    }
  }
};

window.App = App;

// Add event listeners to UI
// Buttons
document.getElementById('buttonSearch').addEventListener('click', App.searchStar);
document.getElementById('buttonCreate').addEventListener('click', App.createStar);
document.getElementById('buttonTransfer').addEventListener('click', App.transferStar);
document.getElementById('buttonMetamask').addEventListener('click', App.connectMetamask);
// Events metamask
window.ethereum.on('accountsChanged', accounts => labelAccount.innerHTML = accountShort(accounts[0].toLowerCase()));
window.ethereum.on('chainChanged', chainId => labelNetwork.innerHTML = NETWORKS[parseInt(chainId, 16)]);
// Event Listeners
window.addEventListener('load', () => {
    // Connect a the web3 provider
    if (window.ethereum) {
        App.connectMetamask();
        App.start();
    } else {
        alert('This application requires metamaks')
    }
});

const accountShort = account => (`${account.substring(0,5)}...${account.substring(account.length-4)}`)