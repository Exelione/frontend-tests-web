import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, ThemeToggle } from '@shared/ui';
import { useAuth } from '@features/auth/auth-context';
import styles from './Header.module.scss';

export function Header() {
  const { user, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          frontend<span>.questions</span>
        </Link>

        {/* Бургер — только на мобилке */}
        <button
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Меню"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>

        {/* Навигация */}
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            onClick={closeMenu}
          >
            Главная
          </NavLink>
          <NavLink
            to="/quiz"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            onClick={closeMenu}
          >
            Квиз
          </NavLink>

          {/* Админка — только для админов */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
              onClick={closeMenu}
            >
              Админка
            </NavLink>
          )}

          {/* На мобилке кнопки авторизации внутри меню */}
          {!user && (
            <div className={styles.mobileAuth}>
              <Link to="/login" onClick={closeMenu}>
                <Button variant="ghost" size="sm">
                  Войти
                </Button>
              </Link>
              <Link to="/register" onClick={closeMenu}>
                <Button size="sm">Регистрация</Button>
              </Link>
            </div>
          )}

          {user && (
            <div className={styles.mobileAuth}>
              <Link to="/profile" onClick={closeMenu} className={styles.mobileUser}>
                <div className={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Выйти
              </Button>
            </div>
          )}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />

          {user ? (
            <>
              <Link to="/profile" className={styles.user}>
                <div className={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className={styles.userName}>{user.name}</span>
              </Link>
              <div className={styles.authButtons}>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Выйти
                </Button>
              </div>
            </>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Войти
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Регистрация</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}