import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + " - EVM" : "EVM"}</title>
        <meta name="description" content="EVM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.navdiv}>
        <header>
          <nav className={styles.nav}>
            <div>
              <Link href="/">
                <a>Vote</a>
              </Link>
            </div>
            <div>
              <Link href="/chief">
                <a>Election Chief</a>
              </Link>
            </div>
            <div>
              <Link href="/result">
                <a>Result</a>
              </Link>
            </div>
          </nav>
        </header>
      </div>
      <main>{children}</main>
      <footer className={styles.footer}>
        EVM - Ethereum Voting Machine by:- Sandeep Kumar Patel
      </footer>
    </>
  );
}

export default Layout;
