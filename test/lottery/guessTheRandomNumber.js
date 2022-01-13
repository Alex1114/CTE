const Web3 = require("web3");
const { BigNumber, utils } = require("ethers")
const BN = require('bn.js');

const provider = new ethers.providers.WebSocketProvider(process.env.ALCHEMY_API_ROPSTEN_KEY)

const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);
const account = signer.connect(provider);
const contractAddress = "0x71561FA28181d7415A6b5f71fb0b18850991A5Aa"


const contractInst = new ethers.Contract(contractAddress, ["function guess(uint8 n) public payable"], account);

contract ("Guess the random number", async () =>{
    let accounts;
    before(async () => {
        accounts = await web3.eth.getAccounts()
    })

    it("should print contract", async () => {
        console.log(contractInst)
    })

    it("should make transaction", async () => {
        const guessNumber = await ethers.getContractFactory("guessTheRandomNumber");
        const guessTest = await guessNumber.deploy();

        let block = await web3.eth.getBlock("11743269");
        console.log(block)

        let i = await guessTest.getNumber(11743269, 1641201643, { from: account[0] })
        console.log({
            i:i.toString(),
            blockTimestamp: block.timestamp,
            timestamp: 1641201643
        })
        
        let tx = await contractInst.guess(i, { value:  1e18.toString() });
        console.log(tx)
    })
})


