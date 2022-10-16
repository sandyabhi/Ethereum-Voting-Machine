import styles from "../styles/Result.module.css";
import Web3Modal from "web3modal";
import { BigNumber, providers, Contract, ethers, utils } from "ethers";
import { useEffect, useRef, useState } from "react";
import { VOTE_CONTRACT_ADDRESS, abi } from "../constants";
import Layout from "../components/Layout";

function Result() {
  const [winName, setWinName] = useState("");
  const [numCandidates, setNumCandidates] = useState("");
  const [numVoters, setNumVoters] = useState("");
  const [leftToVote, setLeftToVote] = useState("");

  const [winVote, setWinVote] = useState(0);

  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();

  const zero = BigNumber.from(0);

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

  const getNumOfCandidatesandVoters = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, provider);

      const count = await votingContract.getNumOfCandidates();
      const vcount = await votingContract.getNumOfVoters();
      const remain = await votingContract.votersLeftTOVote();
      //const yourVote = await votingContract.voterVotedTo();
      count = utils.formatEther(count) * 1000000000000000000;
      vcount = utils.formatEther(vcount) * 1000000000000000000;
      remain = utils.formatEther(remain) * 1000000000000000000;
      setNumCandidates(count);
      setNumVoters(vcount);
      setLeftToVote(remain);

      console.log(count.toString());
      console.log(vcount.toString());
      console.log(remain.toString());
      // console.log(yourVote);
    } catch (error) {
      console.error(error);
    }
  };

  // const getNumOfVoters = async () => {
  //   try {
  //     const provider = await getProviderOrSigner(false);
  //     const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, provider);

  //     const count = await votingContract.getNumOfVoters(provider);
  //     // setNumVoters(count);
  //     //console.log(count, "voterscunt");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // converter
  function createBytes(args) {
    const name = args;
    const bytes = ethers.utils.formatBytes32String(name);
    console.log("Bytes:", bytes);
    return bytes;
  }

  function parseBytes(args) {
    const bytes = args;
    const name = ethers.utils.parseBytes32String(bytes);
    console.log("name: ", name);
    return name;
  }

  ////////////////////////////////////////////////////////////
  /* Winner Name  and Winner Vote-Count*/
  const winnerName = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, provider);
      const name = await votingContract.winnerName();
      setWinName(parseBytes(name));
      //console.log(name, "winner");
    } catch (error) {
      console.error(error);
    }
  };

  const winnerVotes = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, provider);
      const count = await votingContract.winnerVotes();

      count = utils.formatEther(count) * 1000000000000000000;
      setWinVote(count);
      //let no =
      console.log(count, "winner");
    } catch (error) {
      console.error(error);
    }
  };
  /////////////////////=========================>

  function winHandler() {
    winnerVotes();
    winnerName();
  }

  function detailHandler() {
    // getNumOfVoters();
    getNumOfCandidatesandVoters();
  }

  return (
    <>
      <Layout title="result">
        <div className={styles.main}>
          <div className={styles.win}>
            <h3>Winner : {winName}</h3>

            <h3>Total Votes : {winVote}</h3>
            <button className={styles.btn} onClick={winHandler}>
              Show Winner
            </button>
          </div>

          <div className={styles.db}>
            <h2>DashBoard :</h2>
            <p>Total Voters: {numVoters}</p>
            <p>Total Candidates: {numCandidates}</p>
            <p>Voters Left To Vote: {leftToVote}</p>

            <button className={styles.btn} onClick={detailHandler}>
              Show
            </button>
          </div>
          <button className={styles.btn2} onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      </Layout>
    </>
  );
}

export default Result;
