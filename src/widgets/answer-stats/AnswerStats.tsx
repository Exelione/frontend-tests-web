import type { AnswerStats as AnswerStatsType } from '@shared/api';
import styles from './AnswerStats.module.scss';

interface AnswerStatsProps {
  stats: AnswerStatsType;
}

export function AnswerStats({ stats }: AnswerStatsProps) {
  return (
    <div className={styles.stats}>
      <div className={styles.total}>
        Всего ответов: {stats.totalAnswers}
      </div>

      {stats.answers.map((answer) => (
        <div key={answer.answerId} className={styles.item}>
          <div className={styles.header}>
            <span className={styles.text}>{answer.text}</span>
            <span className={styles.count}>
              {answer.count} ({answer.percentage}%)
            </span>
          </div>
          <div className={styles.bar}>
            <div
              className={`${styles.fill} ${
                answer.isCorrect ? styles.correct : styles.neutral
              }`}
              style={{ width: `${answer.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}