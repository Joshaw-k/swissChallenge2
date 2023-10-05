// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract helloWorld {
    string private message;

    // default message
    constructor(string memory _message) {
        message = _message;
    }

    // setting new message
    function setMessage(string calldata _newMessage) public {
        if(keccak256(abi.encodePacked(_newMessage)) == keccak256(abi.encodePacked(message))){
            revert("Same message not allowed");
        }
        message = _newMessage;
    }

    // getting message
    function getMessage() public view returns(string memory){
        return message;
    }

}
