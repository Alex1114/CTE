const Web3 = require("web3");
const { BigNumber, utils } = require("ethers")
const BN = require('bn.js');

const provider = new ethers.providers.WebSocketProvider(process.env.ALCHEMY_API_ROPSTEN_KEY)

const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);
const account = signer.connect(provider);

const contractAddress = "0x8eb2635cCbf32b20320Bb953185b04bFcaF80a50"
const contractInst = new ethers.Contract(contractAddress, ["function guess(uint8 n) external payable"], account);

contract ("Guess the new number", async () =>{
    let accounts;
    before(async () => {
        accounts = await web3.eth.getAccounts()
    })

    it("should print contract", async () => {
        console.log(contractInst)
    })

    it("should make transaction", async () => {
        const guessNumber = await ethers.getContractFactory("guessTheNewNumber");
        const guessTest = await guessNumber.deploy();
        console.log(guessTest.address)

        let tx = await guessTest.getNumber(contractAddress, { value: 1e18.toString() })
        await tx.wait()

        let i = await guessTest.answer();
        console.log(i)

        await guessTest.destroy();
    })
})


