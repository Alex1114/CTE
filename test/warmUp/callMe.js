const Web3 = require("web3");
const ethers = require("ethers")

const provider = new ethers.providers.WebSocketProvider(process.env.ALCHEMY_API_ROPSTEN_KEY)

const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);
const account = signer.connect(provider);
const contractAddress = "0x4867840F34181B9dDAdf827f996d3173E7BDa460"

const contractInst = new ethers.Contract(contractAddress, ["function callme() external"], account);

contract ("call me", async () =>{
    let accounts;
    before(async () => {
        accounts = await web3.eth.getAccounts()
    })
    it("should print contract", async () => {
        console.log(contractInst)
    })
    it("should make transaction", async () => {
        let tx = await contractInst.callme();
        console.log(tx)
    })
})