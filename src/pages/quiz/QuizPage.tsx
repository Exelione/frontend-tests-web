import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getQuestions } from '@shared/api';
import { useAuth } from '@features/auth/auth-context';
import { CategorySelect } from '@features/select-category';
import { QuizCard } from '@widgets/quiz-card';
import { Button, Spinner } from '@shared/ui';
import { Link } from 'react-router-dom';
import styles from './QuizPage.module.scss';

export function QuizPage() {
  const { user, loading: authLoading } = useAuth();
  const [categoryId, setCategoryId] = useState<string | undefined>();

  const userId = user?.id ?? 'anonymous';

  const {
    data: questions,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['quiz-questions', categoryId ?? 'all', userId],
    queryFn: () => getQuestions(10, categoryId),
    enabled: !authLoading,
    retry: 0,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (authLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.centerLoading}>
          <Spinner size="lg" label="Загрузка..." />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {user && (
        <CategorySelect value={categoryId} onChange={setCategoryId} />
      )}

      {isLoading && (
        <div className={styles.centerLoading}>
          <Spinner size="lg" label="Загрузка вопросов..." />
        </div>
      )}

      {!isLoading && error && (
        <div className={styles.error}>
          Ошибка загрузки: {(error as Error).message}
        </div>
      )}

      {!isLoading && !error && questions && questions.length === 0 && (
        <div className={styles.centerLoading}>
          <p>Нет доступных вопросов. Попробуй другую категорию.</p>
        </div>
      )}

      {!isLoading && !error && questions && questions.length > 0 && (
        <>
          {isFetching && (
            <div className={styles.fetchingBar}>
              <Spinner size="sm" label="Обновление..." />
            </div>
          )}
          <QuizContent key={categoryId ?? 'all'} questions={questions} />
        </>
      )}
    </div>
  );
}

interface QuizContentProps {
  questions: Awaited<ReturnType<typeof getQuestions>>;
}

function QuizContent({ questions }: QuizContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  if (finished || currentIndex >= questions.length) {
    return (
      <div className={styles.finished}>
        <h2 className={styles.finishedTitle}>Ты ответил на все вопросы!</h2>
        <p className={styles.finishedText}>
          Правильных ответов: {currentIndex} из {questions.length}
        </p>
        <div className={styles.finishedActions}>
          <Button
            onClick={() => {
              setCurrentIndex(0);
              setFinished(false);
            }}
          >
            Пройти заново
          </Button>
          <Link to="/">
            <Button variant="secondary">На главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <QuizCard
      question={currentQuestion}
      currentIndex={currentIndex}
      totalQuestions={questions.length}
      onNext={handleNext}
    />
  );
}