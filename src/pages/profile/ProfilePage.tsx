import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from '@shared/ui';
import { getMyStats } from '@shared/api';
import { useAuth } from '@features/auth/auth-context';
import styles from './ProfilePage.module.scss';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['my-stats', user?.id],
    queryFn: getMyStats,
    enabled: !!user,
    staleTime: 30 * 1000, // 30 секунд — статистика часто меняется
    refetchOnWindowFocus: true,
  });

  if (!user) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" label="Загрузка..." />
      </div>
    );
  }

  const joinedDate = new Date(user.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.page}>
      {/* Профиль */}
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.joined}>С нами с {joinedDate}</div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="ghost" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </div>

      {/* Статистика */}
      {isLoading && (
        <div className={styles.loadingBlock}>
          <Spinner size="md" label="Загрузка статистики..." />
        </div>
      )}

      {error && (
        <div className={styles.error}>
          Не удалось загрузить статистику: {(error as Error).message}
        </div>
      )}

      {stats && (
        <>
          {/* Общая статистика */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.totalAnswered}</div>
              <div className={styles.statLabel}>Отвечено</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.correctAnswers}</div>
              <div className={styles.statLabel}>Правильных</div>
            </div>
            <div className={styles.statCard}>
              <div
                className={`${styles.statValue} ${
                  stats.accuracy >= 70
                    ? styles.good
                    : stats.accuracy >= 40
                      ? styles.medium
                      : styles.bad
                }`}
              >
                {stats.accuracy}%
              </div>
              <div className={styles.statLabel}>Точность</div>
            </div>
          </div>

          {/* По категориям */}
          {stats.byCategory.length > 0 && (
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>По категориям</h2>
              <div className={styles.categoryList}>
                {stats.byCategory.map((cat) => (
                  <div key={cat.categoryId} className={styles.categoryItem}>
                    <div className={styles.categoryHeader}>
                      <span className={styles.categoryName}>
                        {cat.categoryName}
                      </span>
                      <span className={styles.categoryStats}>
                        {cat.correct} / {cat.answered} ({cat.accuracy}%)
                      </span>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${cat.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Последние ответы */}
          {stats.recentAnswers.length > 0 && (
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Последние ответы</h2>
              <div className={styles.recentList}>
                {stats.recentAnswers.map((answer, index) => (
                  <div key={index} className={styles.recentItem}>
                    <div className={styles.recentHeader}>
                      <span
                        className={`${styles.recentStatus} ${
                          answer.isCorrect ? styles.correct : styles.wrong
                        }`}
                      >
                        {answer.isCorrect ? '✓' : '✗'}
                      </span>
                      <span className={styles.recentDate}>
                        {new Date(answer.createdAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className={styles.recentQuestion}>
                      {answer.questionText}
                    </div>
                    <div className={styles.recentAnswer}>
                      Твой ответ: {answer.answerText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}