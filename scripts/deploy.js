
const hre = require("hardhat");

async function main() {

  const Upload = await hre.ethers.getContractFactory("upload");
  const upload = await Upload.deploy();

  await upload.deployed();

  console.log("Smart contract deployed to:",upload.address);
}


const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
