# Ethereum-Voting-Machine
* [Live](https://ethereum-voting-machine.vercel.app/)
* [Testnet](https://mumbai.polygonscan.com/address/0x51e554C840d68FCba2F58708ECF95655A8E3eD3A#writeContract)
* [Video](https://vimeo.com/760789214)
* [DevPost](https://devpost.com/software/ethereum-voting-machine)

* Built this project in the **Sachack** **Hackathon** 2022.


## What it does:
EVM(Ethereum Voting Machine) is a Blockchain Voting Website:
*  ELection Chief verify the voters to make them eligible to vote.
*  Election chief can also add candidates.
*  Verified voters can vote for the candidate they want to vote for. Voters cannot vote twice or change their vote.
*  Any account can check the result and the total voters, voters absent, and total candidates.


## Demo:
[Voting.sol](https://github.com/sandyabhi/Ethereum-Voting-Machine/blob/main/hardhat-evm/contracts/Voting.sol)

* Click the Own button to  make  account Chief:

![Imgur](https://i.imgur.com/jqspr9c.jpg)

* Chief can add candidate

![Imgur](https://i.imgur.com/uBR70w5.jpg)

* Cheif can verify voters

![Imgur](https://i.imgur.com/ppRmy1n.jpg)

* Voters can vote

![Imgur](https://i.imgur.com/4Ix6FZi.jpg)

* See Result

![Imgur](https://i.imgur.com/IRkgboX.jpg)

* I have added extra 2 candidates because of the demo and video.

## Tech:
* I have used **Solidity** to build the Smart Contract.
* **Hardhat**  framework to Compile and deploy the smart Contract.
* **Nextjs** for the front end .
* **ethersjs** library to create the connection between the contract and the web.
* **web3modal** to connect the metamask wallet.
* **polygon** Mumbai testnet used as Polygon testnet to test
* Javascript HTML CSS
