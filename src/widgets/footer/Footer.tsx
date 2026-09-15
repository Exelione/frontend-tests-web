import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.copy}>
          © {new Date().getFullYear()} frontend.questions
        </span>
        <div className={styles.links}>
          <a href="#" className={styles.link}>
            О проекте
          </a>
          <a href="#" className={styles.link}>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}