

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";


export default async function Home() {

  await requireAuth();
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Protected server component
    </div>
  );
}
