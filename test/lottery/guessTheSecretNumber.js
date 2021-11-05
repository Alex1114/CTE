const Web3 = require("web3");
// const ethers = require("ethers")
const { BigNumber, utils } = require("ethers")
const BN = require('bn.js');

const provider = new ethers.providers.WebSocketProvider(process.env.ALCHEMY_API_ROPSTEN_KEY)

const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);
const account = signer.connect(provider);
const contractAddress = "0x7D6e2c4B2E504E66754565B9ed537Beb8Ba38dB8"


const contractInst = new ethers.Contract(contractAddress, ["function guess(uint8 n) public payable"], account);

const secretNumberHash = "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365"

function isString(s) {
    return (typeof s === 'string' || s instanceof String)
}

contract ("Guess the secret number", async () =>{
    let accounts;
    before(async () => {
        accounts = await web3.eth.getAccounts()
    })
    it("should print contract", async () => {
        console.log(contractInst)
    })
    it("should make transaction", async () => {
        const guessNumber = await ethers.getContractFactory("guessTheSecretNumber");
        const guessTest = await guessNumber.deploy();
        // console.log(guessTest)
        let i = await guessTest.getNumber({ from: account[0] })
        console.log({i:i.toString()})
        
        if(i.toString() != "1000"){
            let tx = await contractInst.guess(i, { value:  1e18.toString() });
            console.log(tx)
        }
    })
})


