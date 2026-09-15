import styles from './HowItWorks.module.scss';

const steps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    title: 'Выбери категорию',
    text: 'React, TypeScript, CSS или другие технологии. Или отвечай на случайные вопросы.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
    ),
    title: 'Отвечай на вопросы',
    text: '4 варианта ответа, только 1 правильный. Сразу видишь результат и статистику.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Следи за прогрессом',
    text: 'Авторизуйся, чтобы не получать вопросы, на которые уже отвечал, и видеть свою статистику.',
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Как это работает</h2>

      <div className={styles.grid}>
        {steps.map((step, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>{step.icon}</div>
            <h3 className={styles.cardTitle}>{step.title}</h3>
            <p className={styles.cardText}>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}