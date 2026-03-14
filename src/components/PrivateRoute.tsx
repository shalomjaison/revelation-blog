import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
