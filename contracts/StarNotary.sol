// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract StarNotary is ERC721 {

    struct Star {
        string name;
        string symbol;
    }
    
    // Implement Task 1 Add a name and symbol properties
    // name: Is a short name to your token
    // symbol: Is a short string like 'USD' -> 'American Dollar'

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    // Constructor
    constructor() ERC721("StarNotary Version 2 - ERC-721", "SN2") {
    }

    // Create Star using the Struct, then map it with its _tokenId and mint it
    function createStar(string memory _name, uint256 _tokenId, string memory _symbol) public {
        Star memory newStar = Star(_name, _symbol);
        tokenIdToStarInfo[_tokenId] = newStar; 
        _mint(msg.sender, _tokenId); 
        approve(address(this), _tokenId);
    }

    // Putting an Star for sale (Adding the star tokenid into the mapping starsForSale, first verify that the sender is the owner)
    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "You can't sale the Star you don't owned");
        starsForSale[_tokenId] = _price;
    }

    // Buy a star token
    function buyStar(uint256 _tokenId) public  payable {
        require(starsForSale[_tokenId] > 0, "The Star should be up for sale");
        uint256 starCost = starsForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);
        require(msg.value > starCost, "You need to have enough Ether");
        ERC721(address(this)).transferFrom(ownerAddress, msg.sender, _tokenId);
        payable(ownerAddress).transfer(starCost);
        if(msg.value > starCost) {
            payable(msg.sender).transfer(msg.value - starCost);
        }
    }

    // Implement Task 1 lookUptokenIdToStarInfo
    function lookUptokenIdToStarInfo (uint _tokenId) public view returns (string memory name, string memory symbol, address owner) {
        Star memory star = tokenIdToStarInfo[_tokenId];
        return(star.name, star.symbol, ownerOf(_tokenId));
    }

    // Implement Task 1 Exchange Stars function
    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
        address ownerToken1 = ownerOf(_tokenId1);
        address ownerToken2 = ownerOf(_tokenId2);
        require(msg.sender == ownerToken1 || msg.sender == ownerToken2, "Sender is not the owner of neither tokens");
        if (ownerToken1 == msg.sender) {
            transferFrom(msg.sender, ownerToken2, _tokenId1);
            ERC721(address(this)).transferFrom(ownerToken2, msg.sender, _tokenId2);
        } else {    
            transferFrom(msg.sender, ownerToken2, _tokenId2);
            ERC721(address(this)).transferFrom(ownerToken2, msg.sender, _tokenId1);
        }
    }

    // Implement Task 1 Transfer Stars
    function transferStar(address _to, uint256 _tokenId) public {
        require(msg.sender == ownerOf(_tokenId), "You are not the owner of the token");
        safeTransferFrom(msg.sender, _to, _tokenId);
    }
}