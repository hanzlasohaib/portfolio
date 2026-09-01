"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

type LogoutButtonProps = {
  className?: string;
};

export function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleLogout() {
    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "same-origin",
        });
        if (!response.ok) {
          setError("Unable to sign out. Please try again.");
          return;
        }
        router.replace("/login");
        router.refresh();
      } catch {
        setError("Network error while signing out.");
      }
    });
  }

  return (
    <div className={cn("flex flex-col items-end gap-2", className)}>
      {error ? (
        <Alert variant="error" title="Sign-out failed">
          {error}
        </Alert>
      ) : null}
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={handleLogout}
        loading={isPending}
      >
        Sign out
      </Button>
    </div>
  );
}
