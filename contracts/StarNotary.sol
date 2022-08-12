// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract StarNotary {
    
    string public starName;
    address public starOwner;
    
    event starClaimed(address owner);
    event starRenamed(string name);

    constructor() {
        starName = "Awesome Udacity Star";
    }

    function claimStar() public {
        starOwner = msg.sender;
        emit starClaimed(msg.sender);
    }
    
    function changeName(string memory _name) public {
        starName = _name;
        emit starRenamed(starName);
    }
}