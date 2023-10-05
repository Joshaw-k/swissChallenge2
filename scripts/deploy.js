const hre = require("hardhat");

async function main() {
  // deploying contract
  const helloWorld = await hre.ethers.deployContract("helloWorld", []);

  await helloWorld.waitForDeployment();

  console.log(helloWorld.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
