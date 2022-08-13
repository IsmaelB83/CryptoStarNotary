// Importing the StartNotary Smart Contract ABI (JSON representation of the Smart Contract)
const StarNotary = artifacts.require("StarNotary");

// Global variables
let accounts;
let owner;
let secondOwner;

// This called the StartNotary Smart contract and initialize it
contract('StarNotary', (accounts) => {
    accounts = accounts;
    owner = accounts[0];
    secondOwner = accounts[1];
});

// Group of tests for StarNotary smart contract
describe("StarNotary Tests", () => { 

    it('can Create a Star', async() => {
        let starId = 1;
        let instance = await StarNotary.deployed();
        await instance.createStar('Pegaso', starId, {from: owner})
        assert.equal(await instance.tokenIdToStarInfo.call(starId), 'Pegaso')
    });
    
    it('lets user put up their star for sale', async() => {
        let instance = await StarNotary.deployed();
        let starId = 2;
        let starPrice = web3.utils.toWei(".01", "ether");
        await instance.createStar('Capricornio', starId, {from: secondOwner});
        await instance.putStarUpForSale(starId, starPrice, {from: secondOwner});
        assert.equal(await instance.starsForSale.call(starId), starPrice);
    });

    it('lets user buy a star, if it is put up for sale', async() => {
        let instance = await StarNotary.deployed();
        let starId = 4;
        let starPrice = web3.utils.toWei(".01", "ether");
        let balance = web3.utils.toWei(".05", "ether");
        await instance.createStar('awesome star', starId, {from: owner});
        await instance.putStarUpForSale(starId, starPrice, {from: owner});
        await instance.buyStar(starId, {from: secondOwner, value: balance});
        assert.equal(await instance.ownerOf.call(starId), secondOwner);
    });

    it('lets user get the funds after the sale', async() => {
        let instance = await StarNotary.deployed();
        let starId = 5;
        let starPrice = web3.utils.toWei(".01", "ether");
        let balance = web3.utils.toWei(".05", "ether");
        await instance.createStar('awesome star', starId, {from: owner});
        await instance.putStarUpForSale(starId, starPrice, {from: owner});
        let balanceBefore = await web3.eth.getBalance(owner);
        await instance.buyStar(starId, {from: secondOwner, value: balance});
        let balanceAfter = await web3.eth.getBalance(owner);
        let value1 = Number(balanceBefore) + Number(starPrice);
        let value2 = Number(balanceAfter);
        assert.equal(value1, value2);
    });  
});