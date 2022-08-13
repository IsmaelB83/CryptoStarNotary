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

    it('can Create a Star with a name and a symbol', async() => {
        let starId = 1;
        let instance = await StarNotary.deployed();
        await instance.createStar('Polaris', starId, 'POL', {from: owner})
        const result = await instance.tokenIdToStarInfo.call(starId)
        assert.equal(result.name, 'Polaris')
        assert.equal(result.symbol, 'POL')
        
    });
    
    it('lets user put up their star for sale', async() => {
        let instance = await StarNotary.deployed();
        let starId = 2;
        let starPrice = web3.utils.toWei(".01", "ether");
        await instance.createStar('Sirius', starId, 'SIR', {from: secondOwner});
        await instance.putStarUpForSale(starId, starPrice, {from: secondOwner});
        assert.equal(await instance.starsForSale.call(starId), starPrice);
    });

    it('lets user buy a star, if it is put up for sale', async() => {
        let instance = await StarNotary.deployed();
        let starId = 4;
        let starPrice = web3.utils.toWei(".01", "ether");
        let balance = web3.utils.toWei(".05", "ether");
        await instance.createStar('Betelgeuse', starId, 'BEL', {from: owner});
        await instance.putStarUpForSale(starId, starPrice, {from: owner});
        await instance.buyStar(starId, {from: secondOwner, value: balance});
        assert.equal(await instance.ownerOf.call(starId), secondOwner);
    });

    it('lets user get the funds after the sale', async() => {
        let instance = await StarNotary.deployed();
        let starId = 5;
        let starPrice = web3.utils.toWei(".01", "ether");
        let balance = web3.utils.toWei(".05", "ether");
        await instance.createStar('Rigel', starId, 'RIG', {from: owner});
        await instance.putStarUpForSale(starId, starPrice, {from: owner});
        let balanceBefore = await web3.eth.getBalance(owner);
        await instance.buyStar(starId, {from: secondOwner, value: balance});
        let balanceAfter = await web3.eth.getBalance(owner);
        let value1 = Number(balanceBefore) + Number(starPrice);
        let value2 = Number(balanceAfter);
        assert.equal(value1, value2);
    });  

    it('look up for a star with its tokenId', async() => {
        let instance = await StarNotary.deployed();
        const result = await instance.lookUptokenIdToStarInfo.call(5);
        assert.equal(result.name, 'Rigel');
        assert.equal(result.symbol, 'RIG');
    });

    it('after transfer star the original owner, the star owner is updated', async() => {
        let instance = await StarNotary.deployed();
        await instance.transferStar(owner, 5, {from: secondOwner})
        assert.equal(await instance.ownerOf.call(5), owner);
    });

    it('after exchange stars the owners should swap', async() => {
        let instance = await StarNotary.deployed();
        await instance.createStar('Antares', 6, 'VEG', {from: owner});
        await instance.createStar('Vega', 7, 'ANT', {from: secondOwner});
        await instance.exchangeStars(6, 7, {from: owner});
        assert.equal(await instance.ownerOf.call(6), secondOwner)
        assert.equal(await instance.ownerOf.call(7), owner)
    });
});