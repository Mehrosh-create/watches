// components/UserProfile.tsx
'use client';
import { useSession } from 'next-auth/react';

export default function UserProfile() {
  const { data: session } = useSession();
  
  return (
    <div>
      {session?.user ? (
        <div>
          <p>Signed in as {session.user.email}</p>
          <p>Role: {session.user.role}</p>
        </div>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}