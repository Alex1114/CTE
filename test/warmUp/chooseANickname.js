const Web3 = require("web3");
const ethers = require("ethers")

const provider = new ethers.providers.WebSocketProvider(process.env.ALCHEMY_API_ROPSTEN_KEY)

const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);
const account = signer.connect(provider);
const contractAddress = "0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee"
let name = "alex1114"

const contractInst = new ethers.Contract(contractAddress, ["function setNickname(bytes32 nickname) external"], account);

contract ("choose a nickname", async () =>{
    let accounts;
    before(async () => {
        accounts = await web3.eth.getAccounts()
    })
    it("should print contract", async () => {
        console.log(contractInst)
    })
    it("should make transaction", async () => {
        name = await ethers.utils.formatBytes32String(name)
        console.log({name})
        let tx = await contractInst.setNickname(name);
        console.log(tx)
    })
})