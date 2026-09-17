import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.copy}>
          © {new Date().getFullYear()} frontend.questions
        </span>
        <div className={styles.links}>
          <a
            href="https://github.com/Exelione/frontend-tests-web"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <a
            href="https://github.com/Exelione/frontend-tests-web#-о-проекте"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            О проекте
          </a>
        </div>
      </div>
    </footer>
  );
}