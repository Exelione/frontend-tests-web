import { useState } from 'react';
import { Button } from '@shared/ui';
import { answerQuestion } from '@shared/api';
import { getSessionId } from '@shared/lib/session';
import type { Question, AnswerResponse } from '@shared/api';
import { AnswerStats } from '@widgets/answer-stats';
import styles from './QuizCard.module.scss';

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
}

export function QuizCard({
  question,
  currentIndex,
  totalQuestions,
  onNext,
}: QuizCardProps) {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = async (answerId: string) => {
    if (result || loading) return;

    setSelectedAnswerId(answerId);
    setLoading(true);
    setError(null);

    try {
      const response = await answerQuestion(
        question.id,
        answerId,
        getSessionId(),
      );
      setResult(response);
    } catch (err) {
      setError((err as Error).message || 'Не удалось отправить ответ');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setSelectedAnswerId(null);
    setResult(null);
    setError(null);
    setLoading(false);
    setShowExplanation(false);
    onNext();
  };

  const handleRetry = () => {
    if (!selectedAnswerId) return;
    setResult(null);
    setError(null);
    handleAnswer(selectedAnswerId);
  };

  const getAnswerClass = (answerId: string) => {
    if (!result) {
      return selectedAnswerId === answerId ? styles.selected : '';
    }

    const isCorrectAnswer = result.stats.answers.find(
      (a) => a.answerId === answerId,
    )?.isCorrect;

    if (isCorrectAnswer) return styles.correct;
    if (selectedAnswerId === answerId) return styles.wrong;
    return '';
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>{question.category.name}</span>
        <span className={styles.progress}>
          {currentIndex + 1} / {totalQuestions}
        </span>
      </div>

      <h2 className={styles.question}>{question.text}</h2>

      <div className={styles.answers}>
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            type="button"
            className={`${styles.answer} ${getAnswerClass(answer.id)}`}
            onClick={() => handleAnswer(answer.id)}
            disabled={!!result || loading}
          >
            <span className={styles.answerText}>{answer.text}</span>
          </button>
        ))}
      </div>

      {loading && !result && (
        <div className={styles.loadingSmall}>
          <div className={styles.spinner} />
          Отправка ответа...
        </div>
      )}

      {error && (
        <div className={styles.errorSmall}>
          <span>{error}</span>
          <Button size="sm" variant="secondary" onClick={handleRetry}>
            Повторить
          </Button>
        </div>
      )}

      {result && <AnswerStats stats={result.stats} />}

      {/* ← Объяснение */}
      {result && question.explanation && (
        <div className={styles.explanationSection}>
          {!showExplanation ? (
            <button
              type="button"
              className={styles.explanationToggle}
              onClick={() => setShowExplanation(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={styles.icon}
              >
                <path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
              </svg>
              Показать объяснение
            </button>
          ) : (
            <div className={styles.explanation}>
              <div className={styles.explanationTitle}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={styles.icon}
                >
                  <path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
                </svg>
                Объяснение</div>
              <p className={styles.explanationText}>{question.explanation}</p>
            </div>
          )}
        </div>
      )}


      {result && (
        <div className={styles.footer}>
          <Button onClick={handleNext}>Следующий вопрос</Button>
        </div>
      )}
    </div>
  );
}