"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleLogout() {
    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/logout", { method: "POST" });
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
    <div className="flex flex-col items-end gap-2">
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
        disabled={isPending}
      >
        {isPending ? "Signing out…" : "Sign out"}
      </Button>
    </div>
  );
}
