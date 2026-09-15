import { Link } from 'react-router-dom';
import { Button } from '@shared/ui';
import styles from './Hero.module.scss';

export function Hero() {
    return (
        <section className={styles.hero}>
            <span className={styles.badge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
                Проверь свои знания</span>

            <h1 className={styles.title}>
                frontend<span>.questions</span>
            </h1>

            <p className={styles.subtitle}>
                Проверь свои знания по React, TypeScript, CSS и другим фронтенд-технологиям.
                Отвечай на вопросы, смотри статистику и становись лучше.
            </p>

            <div className={styles.actions}>
                <Link to="/quiz">
                    <Button size="lg">Начать квиз</Button>
                </Link>
                <Link to="/register">
                    <Button variant="secondary" size="lg">
                        Регистрация
                    </Button>
                </Link>
            </div>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <div className={styles.statValue}>100+</div>
                    <div className={styles.statLabel}>Вопросов</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statValue}>5</div>
                    <div className={styles.statLabel}>Категорий</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statValue}>∞</div>
                    <div className={styles.statLabel}>Попыток</div>
                </div>
            </div>
        </section>
    );
}