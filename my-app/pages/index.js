import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { VOTE_CONTRACT_ADDRESS, abi } from "../constants";
import Layout from "../components/Layout";
import Candidates from "../components/Candidates";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
    }
  }, [walletConnected]);

  const [selectedHouse, setSelectedHouse] = useState(0);

  function handleSelectChange(event) {
    setSelectedHouse(event.target.value);
  }

  function submitHandler() {
    toVote(selectedHouse - 1);
    console.log(selectedHouse);
    setSelectedHouse(0);
  }

  /* Vote to the Candidate */

  const toVote = async (ID) => {
    try {
      const signer = await getProviderOrSigner(true);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);
      const tx = await votingContract.toVote(ID);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout title="">
        <div className={styles.main}>
          <p>Candidates :</p>
          <Candidates />
          <div className={styles.option}>
            <select
              name="Houses"
              value={selectedHouse}
              onChange={handleSelectChange}
            >
              <option value={1}>Shanti House</option>
              <option value={2}>Jyoti House</option>
              <option value={3}>Preeti House</option>
            </select>

            <button onClick={submitHandler}>Vote</button>
          </div>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      </Layout>
    </>
  );
}

//   return (
//     <div>
//       <Layout title={"Vote"}></Layout>
//       <div>
//         <button onClick={addRed}>Red</button>
//         <button onClick={addBlue}>Blue</button>
//       </div>
//       <div>
//         <input ref={inputRef} type="text" name="ID" />
//         <button onClick={handleClick}>Verify the Voter</button>
//       </div>
//       <div>
//         <button onClick={toVoteBlue}>Vote to Red</button>
//         <button onClick={toVoteRed}>Vote to Blue</button>
//       </div>

//       <div>
//         <button onClick={getNumOfCandidates}>getC</button>
//         <button onClick={VotOwner}>Owner</button>
//       </div>

//       <div>
//         <button onClick={winnerName}>Winner votes</button>
//         <button onClick={winnerVotes}>Winner name</button>
//       </div>
//     </div>
//   );
// }

// const getProviderOrSigner = async (needSigner = false) => {
//   const provider = await web3ModalRef.current.connect();
//   const web3Provider = new providers.Web3Provider(provider);
//   const { chainId } = await web3Provider.getNetwork();

//   if (chainId !== 80001) {
//     window.alert("Change the network to Mumbai");
//     throw new Error("Change network to Mumbai");
//   }
//   if (needSigner) {
//     const signer = web3Provider.getSigner();
//     return signer;
//   }
//   return web3Provider;
// };

// const addCandidate = async (name, party) => {
//   try {
//     const signer = await getProviderOrSigner(true);

//     const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);

//     // Covert this to bytes32
//     const tx = await votingContract.addCandidate(name, party);

//     //await tx.wait();
//     await getNumOfCandidates();
//   } catch (error) {
//     console.error(error);
//   }
// };

// const VotOwner = async () => {
//   const signer = await getProviderOrSigner(true);
//   const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);
//   const tx = await votingContract.VotOwner(signer);
//   //setOwner(true);
// };

// const getNumOfCandidates = async () => {
//   try {
//     const provider = await getProviderOrSigner(false);
//     const numVoters = await getNumOfCandidates(provider);

//     setNumOfVoters(numVoters);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const addHandler = () => {
//   addCandidate(
//     "0x7265640000000000000000000000000000000000000000000000000000000000",
//     "0x626c756500000000000000000000000000000000000000000000000000000000"
//   );
// };

// const cHandler = () => {
//   getNumOfCandidates();
// };

// const connectWallet = async () => {
//   try {
//     await getProviderOrSigner();

//     setWalletConnected(true);

//     //
//     //    getNumberOfWhitelisted();
//   } catch (error) {
//     console.error(error);
//   }
// };
// useEffect(() => {
//   if (!walletConnected) {
//     web3ModalRef.current = new Web3Modal({
//       network: "mumbai",
//       providerOptions: {},
//       disableInjectedProvider: false,
//     });

//     connectWallet();
//   }
// }, []);
