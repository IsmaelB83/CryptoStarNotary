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

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  createStar: async function() {
    const { createStar } = this.meta.methods;
    const name = document.getElementById("starName").value;
    const id = document.getElementById("starId").value;
    await createStar(name, id).send({from: this.account});
    App.setStatus("New Star Owner is " + this.account + ".");
  }
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