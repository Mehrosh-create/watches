// app/admin/page.tsx
import { auth } from '@/app/api/auth/[...nextauth]/route';  
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();
  
  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
    </div>
  );
}