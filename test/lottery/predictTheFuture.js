const Web3 = require("web3");
const { BigNumber, utils } = require("ethers")
const BN = require('bn.js');

const provider = new ethers.providers.WebSocketProvider(process.env.ALCHEMY_API_ROPSTEN_KEY)

const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);
const account = signer.connect(provider);

const contractAddress = "0x9a144cb7E990dC333f5cCd4aa4847BBb1BC4843f"
const contractInst = new ethers.Contract(contractAddress, ["function lockInGuess(uint8 n) external payable", "function isComplete() external view returns (bool)"], account);

contract ("Guess the new number", async () =>{
    let accounts;
    before(async () => {
        accounts = await web3.eth.getAccounts()
    })

    it("should print contract", async () => {
        console.log(contractInst)
    })

    it("should make transaction", async () => {
        const guessAdd = "0xF5142f6B4DA62E2D233753D41a963936C593f04b"

        const guessTest = new ethers.Contract(
            guessAdd,
            [
                "function guess() external",
                "function success() external",
                "function destroy() external",
                "function setTargetContract(address _target) external",
                "function readAnswer() external view returns(uint8, uint8)"
            ],
            account
        );
        console.log(guessTest.address)

        let tx = await web3.eth.sendTransaction({from: account.address, to:guessTest.address, value:1e18.toString() })

        tx = await guessTest.setTargetContract(contractAddress)
        await tx.wait()

        tx = await guessTest.guess()
        await tx.wait()

        let completed = false;

        while(completed == false){

            tx = await guessTest.success()
            await tx.wait()
            completed = await contractInst.isComplete()
            console.log(completed)
        }


    })
})


