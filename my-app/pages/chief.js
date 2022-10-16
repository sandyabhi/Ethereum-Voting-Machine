import Web3Modal from "web3modal";
import { providers, Contract, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { VOTE_CONTRACT_ADDRESS, abi } from "../constants";
import Layout from "../components/Layout";
import styles from "../styles/Chief.module.css";

function Chief() {
  const [numVoters, setNumVoters] = useState();
  const [numCandidates, setNumCandidates] = useState();
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [houseName, setHouseName] = useState("");

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

  const VotOwner = async () => {
    const signer = await getProviderOrSigner(true);
    const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);

    const address = await signer.getAddress();

    const aa = await votingContract.VotOwner();

    const oww = await votingContract.owner;
  };

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
  }

  ///////////////////////////////////////////////////
  /* Add Candidate  */

  const validateInput = (e) => {
    e.preventDefault();

    const bytesname = createBytes(name);
    const byteshouseName = createBytes(houseName);
    parseBytes(bytesname);
    console.log(bytesname, byteshouseName);

    addCandidate(bytesname, byteshouseName);

    setName("");
    setHouseName("");
  };

  const addCandidate = async (name, party) => {
    try {
      const signer = await getProviderOrSigner(true);

      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);

      // Covert this to bytes32
      const tx = await votingContract.addCandidate(name, party);

      await tx.wait();
      // await getNumOfCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  ////////////////////==================>

  /* verify the voter */
  const inputRef = useRef(null);

  function verifyHandler() {
    const id = inputRef.current.value;
    getRightToVote(id);
    console.log(id);
  }

  const getRightToVote = async (ID) => {
    try {
      const signer = await getProviderOrSigner(true);
      const votingContract = new Contract(VOTE_CONTRACT_ADDRESS, abi, signer);
      const tx = await votingContract.getRightToVote(ID);
      console.log(tx);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout title="election-chief">
        <div className={styles.chiefdiv}>
          <div className={styles.main}>
            <div className={styles.own}>
              <p> Click to become the Election Chief </p>
              <span>
                <button className={styles.btn} onClick={VotOwner}>
                  Own
                </button>
              </span>
            </div>
            <div>
              <button className={styles.btn2} onClick={connectWallet}>
                Connect the wallet
              </button>
            </div>
          </div>

          <div>
            <div className={styles.form_div}>
              <p>Add Candidate :</p>
              <form className={styles.form} onSubmit={validateInput}>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Candidate Name"
                />
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  value={houseName}
                  onChange={(e) => setHouseName(e.target.value)}
                  placeholder="Enter Candidate Party"
                />
                <button className={styles.btn3} type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>

          <div className={styles.verify_div}>
            <div className={styles.verify}>
              <p>Verify the Voter:</p>
              <input
                className={styles.voterid}
                placeholder="Voter-ID"
                type="text"
                ref={inputRef}
              />
              <button className={styles.btn4} onClick={verifyHandler}>
                Verify
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Chief;
