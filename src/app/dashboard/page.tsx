// app/dashboard/page.tsx
import { auth } from '@/app/api/auth/[...nextauth]/route';  
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <p>Your role: {session.user.role}</p>
    </div>
  );
}