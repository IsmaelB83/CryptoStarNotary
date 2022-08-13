// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract StarNotary is ERC721 {

    struct Star {
        string name;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    // Constructor
    constructor() ERC721("StarNotary Version 2 - ERC-721", "SN2") {
    }

    // Create Star using the Struct
    function createStar(string memory _name, uint256 _tokenId) public {
        // Star is an struct so we are creating a new Star
        Star memory newStar = Star(_name);
        // Creating in memory the Star -> tokenId mapping
        tokenIdToStarInfo[_tokenId] = newStar; 
        // _mint assign the the star with _tokenId to the sender address (ownership)
        _mint(msg.sender, _tokenId); 
    }

    // Putting an Star for sale (Adding the star tokenid into the mapping starsForSale, first verify that the sender is the owner)
    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "You can't sale the Star you don't owned");
        starsForSale[_tokenId] = _price;
        approve(address(this), _tokenId);
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
}