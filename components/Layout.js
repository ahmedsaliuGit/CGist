import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import { Button } from "react-bootstrap";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Community Gist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h2 className={styles.navTitle}>cGist</h2>
        <nav className={styles.nav}>
          <Link href="/">
            <a>Home</a>
          </Link>

          <Button className={styles.navButton} variant="primary">
            Create Account
          </Button>
        </nav>
        <Button className={styles.navMenuButton} variant="secondary">
          Menu
        </Button>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Made with love by @ahmedsaliu</footer>
    </div>
  );
}
