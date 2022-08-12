import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

const App = {

  web3: null,
  account: null,
  meta: null,

  start: async function() {

    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    // Current name of the star
      this.starNameFunc();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  starOwnerFunc: async function() {
    const { starOwner } = this.meta.methods;
    const owner = await starOwner().call();
    document.getElementById("owner").innerHTML = owner;
  },

  starNameFunc: async function() {
    const { starName } = this.meta.methods;
    const name = await starName().call();
    document.getElementById("name").innerHTML = name;
  },

  starSetNameFunc: async function() {
    const { changeName } = this.meta.methods;
    const newName = document.getElementById('newName').value
    const aux = await changeName(newName).send({ from: this.account });
    console.log(aux);
    // Current name of the star
    this.starNameFunc();
  },

  claimStarFunc: async function() {
    this.setStatus("Initiating transaction... (please wait)");
    const { claimStar } = this.meta.methods;
    await claimStar().send({ from: this.account });
    this.setStatus("Transaction complete!");
    this.starOwnerFunc();
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    App.web3 = new Web3(window.ethereum);
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => console.log)
    .catch(error => alert(error.message))
    window.ethereum.request({ method: 'eth_requestAccounts' })
  } else {
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }
  App.start();
});
