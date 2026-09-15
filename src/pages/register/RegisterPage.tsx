import { useState, type SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Turnstile } from '@marsidev/react-turnstile';
import { Button, Input } from '@shared/ui';
import { register } from '@shared/api';
import { useAuth } from '@features/auth/auth-context';
import styles from './RegisterPage.module.scss';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export function RegisterPage() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!email || !name || !password || !confirmPassword) {
            setError('Заполни все поля');
            return;
        }

        if (password.length < 6) {
            setError('Пароль должен быть минимум 6 символов');
            return;
        }

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        if (!captchaToken) {
            setError('Пройди капчу');
            return;
        }

        setLoading(true);

        try {
            const response = await register(email, name, password, captchaToken);
            loginUser(response.user, response.token);
            navigate('/quiz');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Регистрация</h1>
                <p className={styles.subtitle}>
                    Создай аккаунт, чтобы отслеживать прогресс
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        type="text"
                        name="name"
                        label="Имя"
                        placeholder="Иван"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <Input
                        type="password"
                        name="password"
                        label="Пароль"
                        placeholder="Минимум 6 символов"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Input
                        type="password"
                        name="confirmPassword"
                        label="Повторите пароль"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {SITE_KEY && (
                        <div className={styles.captcha}>
                            <Turnstile
                                siteKey={SITE_KEY}
                                onSuccess={(token) => setCaptchaToken(token)}
                                onError={() => setError('Ошибка капчи')}
                            />
                        </div>
                    )}

                    {error && <div className={styles.error}>{error}</div>}

                    <Button type="submit" size="lg" disabled={loading}>
                        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </Button>
                </form>

                <div className={styles.footer}>
                    Уже есть аккаунт?
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </div>
            </div>
        </div>
    );
}