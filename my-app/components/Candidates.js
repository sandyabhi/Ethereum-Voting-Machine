import styles from "../styles/Home.module.css";

function Candidates() {
  return (
    <>
      <div className={styles.table}>
        <table>
          <thead>
            <tr className={styles.tr}>
              <th>ID</th>
              <th>Party</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tr1}>
              <td>1</td>
              <td>Sandeep</td>
              <td>Shanti House</td>
            </tr>
            <tr className={styles.tr2}>
              <td>2</td>
              <td>Abhi</td>
              <td>Jyoti House</td>
            </tr>
            <tr className={styles.tr3}>
              <td>3</td>
              <td>Abhishek</td>
              <td>Preeti House</td>
            </tr>
          </tbody>
        </table>

        {/* <div className={styles.option}>
          <select
            name="Houses"
            value={selectedHouse}
            onChange={handleSelectChange}
          >
            <option value={1}>Shanti House</option>
            <option value={2}>Jyoti House</option>
            <option value={3}>Preeti House</option>
          </select>

          <span>
            <button onClick={submitHandler}>Vote</button>
          </span>
          <span>
            <button onClick={connectWallet}>Connect Wallet</button>
          </span>
        </div> */}
      </div>
    </>
  );
}

export default Candidates;
