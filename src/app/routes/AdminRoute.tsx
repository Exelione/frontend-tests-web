import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@features/auth/auth-context';
import { Spinner } from '@shared/ui';

export function AdminRoute() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Spinner size="lg" label="Загрузка..." />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}