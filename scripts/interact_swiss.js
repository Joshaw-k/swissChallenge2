const hre = require("hardhat");
const {
  encryptDataField,
  decryptNodeResponse,
} = require("@swisstronik/swisstronik.js");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = hre.network.config.url;

  const [encryptedData] = await encryptDataField(rpclink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

const sendShieldedQuery = async (provider, destination, data) => {
  const rpclink = hre.network.config.url;

  const [encryptedData, usedEncryptedKey] = await encryptDataField(
    rpclink,
    data
  );

  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });

  return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};

async function main() {
  const contractAddress = "0x409b077d89b6CBf92Ad6B6ACEC818f502B893078";

  const position = "0x0";

  const blockNumber = "latest";

  const [signer] = await hre.ethers.getSigners();

  // getting contract instance
  const contractFactory = await hre.ethers.getContractFactory("helloWorld");

  const contract = contractFactory.attach(contractAddress);

  console.log(
    `The value at storage 0 after deployment: ${await hre.ethers.provider.getStorage(
      contractAddress,
      position,
      blockNumber
    )}`
  );

  // setting new message
  const setMessageTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData("setMessage", ["Welcome Web3s"]),
    0
  );
  await setMessageTx.wait();

  console.log(
    `The value at storage 0 after setting new message: ${await hre.ethers.provider.getStorage(
      contractAddress,
      position,
      blockNumber
    )}`
  );

  // getting message
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData("getMessage")
  );

  console.log(
    "the message from the getMessage function:",
    contract.interface.decodeFunctionResult("getMessage", responseMessage)[0]
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
