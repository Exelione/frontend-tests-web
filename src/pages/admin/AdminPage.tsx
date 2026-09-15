import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, createQuestion } from '@shared/api';
import { Button, Input, Select, Spinner } from '@shared/ui';
import styles from './AdminPage.module.scss';

interface AnswerInput {
    text: string;
    isCorrect: boolean;
}

export function AdminPage() {
    const queryClient = useQueryClient();

    const [text, setText] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [answers, setAnswers] = useState<AnswerInput[]>([
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
    ]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    const mutation = useMutation({
        mutationFn: createQuestion,
        onSuccess: () => {
            setSuccess('Вопрос успешно создан!');
            setText('');
            setAnswers([
                { text: '', isCorrect: true },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
            ]);
            setError('');
            queryClient.invalidateQueries({ queryKey: ['quiz-questions'] });
            setTimeout(() => setSuccess(''), 3000);
        },
        onError: (err: Error) => {
            setError(err.message);
            setSuccess('');
        },
    });

    const handleAnswerChange = (index: number, value: string) => {
        setAnswers((prev) =>
            prev.map((a, i) => (i === index ? { ...a, text: value } : a)),
        );
    };

    const handleCorrectChange = (index: number) => {
        setAnswers((prev) =>
            prev.map((a, i) => ({ ...a, isCorrect: i === index })),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!text.trim()) {
            setError('Введите текст вопроса');
            return;
        }

        if (!categoryId) {
            setError('Выберите категорию');
            return;
        }

        if (answers.some((a) => !a.text.trim())) {
            setError('Заполните все варианты ответа');
            return;
        }

        mutation.mutate({
            text: text.trim(),
            categoryId,
            answers: answers.map((a) => ({
                text: a.text.trim(),
                isCorrect: a.isCorrect,
            })),
        });
    };

    if (categoriesLoading) {
        return (
            <div className={styles.loading}>
                <Spinner size="lg" label="Загрузка..." />
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Админка — создание вопроса</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label="Текст вопроса"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Что такое JSX?"
                    required
                />

                <div className={styles.field}>
                    <Select
                        label="Категория"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        placeholder="Выбери категорию"
                        options={
                            categories?.map((cat) => ({ value: cat.id, label: cat.name })) ?? []
                        }
                        required
                    />
                </div>

                <div className={styles.answersSection}>
                    <label className={styles.label}>Варианты ответа</label>
                    <p className={styles.hint}>Отметь правильный ответ</p>

                    {answers.map((answer, index) => (
                        <div key={index} className={styles.answerRow}>
                            <input
                                type="radio"
                                name="correct"
                                checked={answer.isCorrect}
                                onChange={() => handleCorrectChange(index)}
                                className={styles.radio}
                            />
                            <Input
                                value={answer.text}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                placeholder={`Вариант ${index + 1}`}
                                required
                            />
                        </div>
                    ))}
                </div>

                {error && <div className={styles.error}>{error}</div>}
                {success && <div className={styles.success}>{success}</div>}

                <Button type="submit" size="lg" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Создание...' : 'Создать вопрос'}
                </Button>
            </form>
        </div>
    );
}