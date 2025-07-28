'use client';
import { Button } from './Button';
import { resetUrl } from '@/lib/utils/url';

export function ResetUrlButton({ 
  children = "Reset",
  redirectPath 
}: {
  children?: React.ReactNode;
  redirectPath?: string;
}) {
  return (
    <Button 
      onClick={() => resetUrl(redirectPath)}
      variant="outline"
    >
      {children}
    </Button>
  );
}