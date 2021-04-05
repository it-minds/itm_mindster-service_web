import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useProtectChanges = () => {
  const [unsavedChanged, setUnsavedChanges] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("", () => {
      // TODO protect the navigation by presenting a modal.
    });
  }, [router, unsavedChanged]);

  return { unsavedChanged, setUnsavedChanges };
};
