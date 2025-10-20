"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as ga from "@/lib/analytics";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams ? `?${searchParams.toString()}` : "");
    ga.pageview(url);
  }, [pathname, searchParams]);

  return null;
}
