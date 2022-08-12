// Importing the StartNotary Smart Contract ABI (JSON representation of the Smart Contract)
const StarNotary = artifacts.require("StarNotary");

// Global variables
let accounts;
let owner;

// This called the StartNotary Smart contract and initialize it
contract('StarNotary', (accounts) => {
    accounts = accounts;
    owner = accounts[0];
    secondOwner = accounts[1];
});

// Group of tests for StarNotary smart contract
describe("StarNotary Tests", () => {
    
    // Test deployment
    it('has correct name', async () => {
        // Making sure the Smart Contract is deployed and getting the instance.
        let instance = await StarNotary.deployed(); 
        // Calling the starName property and check result
        let starName = await instance.starName.call(); 
        assert.equal(starName, "Awesome Udacity Star");
    });

    // Claim start
    it('claim star updates star owner', async () => {
        // Making sure the Smart Contract is deployed and getting the instance.
        let instance = await StarNotary.deployed(); 
        // Claim a star
        await instance.claimStar({from: owner}); 
        assert.equal(owner, await instance.starOwner.call());
    });
    
    // Claim start can change owner
    it('claim star can change owner', async () => {
        // Making sure the Smart Contract is deployed and getting the instance.
        let instance = await StarNotary.deployed(); 
        // Claim a star
        await instance.claimStar({from: owner}); 
        assert.equal(owner, await instance.starOwner.call());
        // Change owner of a star
        await instance.claimStar({from: secondOwner}); 
        assert.equal(secondOwner, await instance.starOwner.call());        
    });

    // Change name of a star
    it('change name of a star', async () => {
        // Making sure the Smart Contract is deployed and getting the instance.
        let instance = await StarNotary.deployed(); 
        // Claim a star
        await instance.changeName('Pegaso', {from: owner}); 
        assert.equal('Pegaso', await instance.name.call());
    });
})
