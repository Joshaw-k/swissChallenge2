const hre = require("hardhat");

async function main() {
  const contractAddress = "0xD2Ba5344B377416c22D1b78698C77b42CA3e016F";
  const position = "0x0";
  const blockNumber = "latest";

  // getting contract instance
  const helloWorld = await hre.ethers.getContractAt(
    "IHelloWorld",
    contractAddress
  );

  console.log(
    `The value at storage 0 after deployment: ${await hre.ethers.provider.getStorage(
      contractAddress,
      position,
      blockNumber
    )}`
  );

  // setting new message
  const setMessage = await helloWorld.setMessage("Welcome Web3 Ninja");
  await setMessage.wait();

  console.log(
    `The value at storage 0 after setting new message: ${await hre.ethers.provider.getStorage(
      contractAddress,
      position,
      blockNumber
    )}`
  );

  console.log(
    `the message from the getMessage function: ${await helloWorld.getMessage()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
