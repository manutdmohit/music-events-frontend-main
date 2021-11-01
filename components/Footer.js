import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Music Events {year} </p>
      <p>
        <Link href="/about">
          <a>About this project</a>
        </Link>
      </p>
    </footer>
  );
}
