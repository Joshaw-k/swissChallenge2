// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IHelloWorld {
    function setMessage(string calldata _newMessage) external ;
    function getMessage() external view returns(string memory);
}
