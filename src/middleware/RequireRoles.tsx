import { useUser } from '@/hooks/user';
import { Outlet, Navigate } from 'react-router-dom';
import type { UserRole } from '../types';
import { toast } from 'react-toastify';


export default function RequireRoles({ roles }: { roles: UserRole[] }) {
  const { data: user, isLoading } = useUser();
  if (isLoading) return <div className="bg-white min-h-screen text-center">Loading...</div>;
  if (!user || !roles.includes(user.role)) {
    toast.error("You do not have permission to access this page.");
    return <Navigate to="/dashboard/settings/general" replace />;
  }

  return <Outlet />;
}