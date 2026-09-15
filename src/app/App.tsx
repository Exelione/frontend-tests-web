import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import { ProtectedRoute, AdminRoute } from './routes';
import { HomePage } from '@pages/home/HomePage';
import { QuizPage } from '@pages/quiz/QuizPage';
import { LoginPage } from '@pages/login/LoginPage';
import { RegisterPage } from '@pages/register/RegisterPage';
import { ProfilePage } from '@pages/profile/ProfilePage';
import { AdminPage } from '@pages/admin/AdminPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
}