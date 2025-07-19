// components/UserAvatar.tsx
"use client";
import { useSession } from "next-auth/react";

export default function UserAvatar() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-2">
      {session.user?.image && (
        <img 
          src={session.user.image} 
          alt="Avatar" 
          className="w-8 h-8 rounded-full" 
        />
      )}
      <span>{session.user?.name}</span>
    </div>
  );
}