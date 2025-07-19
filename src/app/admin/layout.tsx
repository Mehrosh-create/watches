// app/admin/layout.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNavbar from '@/components/Navbar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (session?.user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}