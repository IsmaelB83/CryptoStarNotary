# CRYPTOSTARNOTARY
DApp developed for the 2nd project of Udacity's Blockchain Developer Nanodegree.

The application allows the user to register stars on the blockchain with a name, symbol and tokenId. It implements standard ERC-721 and allow the users to trade and exchange the star associates with its user address on etherem (currently deployed on Rinkeby).

This repository contains a simple frontend as well. Vanilla JS with Bulma CSS styles. The frontend allows you to look for a star (based on its tokenID), register new stars and transfer stars to other users.

This DApp is alredy deployed on rinkeby:
- Smart Contract Address: 0x634726cd222bBe60949979B73Bfbc627754f5d52  (https://rinkeby.etherscan.io/address/0x634726cd222bBe60949979B73Bfbc627754f5d52)
- Some tokens minted and the address to where they belong (0x91f8A34a3De20f8E5A6BD42f0D0d1278B3693836):
    Name: Vega          -   Symbol: VEG    -   TokenId: 1       (MINTED ON https://rinkeby.etherscan.io/tx/0x916f892fdcd73bc87d8847e383c24fa27ed25d222714eafdbc0f98c6a5adaac0)
    Name: Betelgeuse    -   Symbol: BET    -   TokenId: 2       (MINTED ON https://rinkeby.etherscan.io/tx/0x7e7c0617cac32f693563bcc1bd62c4a784bdac84c785c31a839d1e1b6f54497e)
    Name: Polaris       -   Symbol: POL    -   TokenId: 3       (MINTED ON https://rinkeby.etherscan.io/tx/0x7147a4a1ccc9b23aeefe101d050766f72bb1ac295bb6686005569dc2794a0315)
- Latest star (Polaris) was later transfer to address (0xebdd2A93E90b5DA3e18032fE0210c971E16c92F2):
    Transaction https://rinkeby.etherscan.io/tx/0x50b6bf08630890733fedf2ba249dbfb7bc1b3dd012140d82742ebf1a1d937a22
    

# DEPENDENCIES

## Backend (smart contract):
This project has been implemented with following versions of truffle and solidity
- Truffle - v5.5.25 (core: 5.5.25)
- Solidity - 0.8.15 (solc-js)

The dependencies identified in package.json are:
- "@openzeppelin/contracts": "^4.7.3",
- "@truffle/hdwallet-provider": "^2.0.13",
- "dotenv": "^16.0.1",
- "truffle-hdwallet-provider": "^1.0.17"

## Frontend (web)
- "web3": "^1.2.4"
- (dev-dependency) "copy-webpack-plugin": "^5.0.5",
- (dev-dependency) "webpack": "^4.41.2",
- (dev-dependency) "webpack-cli": "^3.3.10",
- (dev-dependency) "webpack-dev-server": "^3.9.0"

# DEPLOYMENT

## Download
To download the repository
```
\downloads\git clone https://github.com/IsmaelB83/CryptoStarNotary.git
```

## Install dependencies

Install all the required npm packages both in backend and frontend folders
```
\downloads\CryptoStarNotary\npm install
\downloads\CryptoStarNotary\app\npm install
```
## Configuration

**BACKEND**
Before deploying the network to any ethereum network, you need to provide an .env file with the parameters to connect trough infura. You just need three parameters as shown in .env.example:
INFURA_KEY='abcde'
INFURA_SECRET='abcde'
MNEMONIC='mnemonic of your wallet with funds'

## Deploy backend
- Test contracts
```
\downloads\CryptoStarNotary\truffle develop
truffle(develop)> test
```

- Migrate contracts to rinkeby network
```
\downloads\CryptoStarNotary\truffle migrate --reset --network rinkeby
```

## Start Frontend
To start the frontend in dev environment 
```
\downloads\CryptoStarNotary\app\npm run dev
```

### Create a star
Enter the name, symbol and a unique tokenId and click on create:
![alt text](https://raw.githubusercontent.com/IsmaelB83/CryptoStarNotary/master/images/CreateStar.png)

### Transfer a star
Make sure the current metamask address ordering the transfer is the owner of the star you are about to transfer. Then enter the recipient addres and click on transfer:
![alt text](https://raw.githubusercontent.com/IsmaelB83/CryptoStarNotary/master/images/TransferStar.png)

