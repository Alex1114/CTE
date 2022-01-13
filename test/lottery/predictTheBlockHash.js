const Web3 = require("web3");
const { BigNumber, utils } = require("ethers")
const BN = require('bn.js');

const provider = new ethers.providers.WebSocketProvider(process.env.ALCHEMY_API_ROPSTEN_KEY)

const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);
const account = signer.connect(provider);

const contractAddress = "0xE8CcEB17DCf24F6D57cb7F6Ec3f8D46266bcF63D"
const contractInst = new ethers.Contract(contractAddress, ["function lockInGuess(bytes32 hash) external payable", "function isComplete() external view returns (bool)"], account);

contract ("Guess the hash", async () =>{
    let accounts;
    before(async () => {
        accounts = await web3.eth.getAccounts()
    })

    it("should print contract", async () => {
        console.log(contractInst)
    })

    it("should make transaction", async () => {
        const guessAdd = "0x4C9708231474535b07C811D9d2f521FE3EdD11a5"

        const guessTest = new ethers.Contract(
            guessAdd,
            [
                "function guess() external",
                "function success() external",
                "function destroy() external",
                "function setTargetContract(address _target) external",
            ],
            account
        );
        console.log(guessTest.address)

        let tx = await web3.eth.sendTransaction({from: account.address, to:guessTest.address, value:1e18.toString() })

        tx = await guessTest.setTargetContract(contractAddress)
        await tx.wait()

        tx = await guessTest.guess()
        await tx.wait()

        // wait 256 block.............

        // tx = await guessTest.success()
        // await tx.wait()
    })
})


