const { utils } = require("ethers");

async function main() {
    const baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmZJgc3aEDKUX3XvrGP3mmizBSwcBnvtefC41SRJuxhUe9/";
    const notRevealedURI = "https://gateway.pinata.cloud/ipfs/QmZJgc3aEDKUX3XvrGP3mmizBSwcBnvtefC41SRJuxhUe9/3.json";

    // Get owner/deployer's wallet address
    const [owner] = await hre.ethers.getSigners();

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("CryptoverseXplore");
    const contractFactory_pay = await hre.ethers.getContractFactory("Payments");


    // Deploy contract with the correct constructor arguments
    const contract_pay = await contractFactory_pay.deploy(["0xfB2069bF55EB844694D8028dF74daFE550821fFc", "0x3909361Ab1c0a3D725E605e8ceddDa0731a98807", "0xBc6A681F7ebf7a9AD9b564E4FF81148cbde6B243"], [40,50,10]);

    // Wait for this transaction to be mined
    await contract_pay.deployed();
    const contract = await contractFactory.deploy("prova", "simbolo prova", baseTokenURI, notRevealedURI, contract_pay.address);

    await contract.deployed();

    // Get contract address
    console.log("Contract deployed to:", contract.address);
    console.log("Contract_pay deployed to:", contract_pay.address);


    // Reserve NFTs
    //let txn = await contract.reserveNFTs();
    //await txn.wait();
    //console.log("10 NFTs have been reserved");

    // Mint 3 NFTs by sending 0.03 ether
    //(txn = await contract.mint(3, { value: utils.parseEther('0.03') });
    //await txn.wait()

    // Get all token IDs of the owner
    //let tokens = await contract.tokensOfOwner(owner.address)
    //console.log("Owner has tokens: ", tokens);

    //let withdraw = await contract.withdraw(["0xfB2069bF55EB844694D8028dF74daFE550821fFc", "0x3909361Ab1c0a3D725E605e8ceddDa0731a98807", "0xBc6A681F7ebf7a9AD9b564E4FF81148cbde6B243"])


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });