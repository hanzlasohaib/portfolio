import { Suspense } from "react";

import { LoginForm } from "@/features/authentication";
import { Text } from "@/components/text";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <Text variant="small" className="text-center">
          Loading…
        </Text>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
