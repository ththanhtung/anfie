import { useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const createQueryString = useCallback(
    (queries: { [s: string]: unknown; } | ArrayLike<unknown>) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      Object.entries(queries).forEach((value: any) => {
        if (!value[1]) {
          params.delete(value[0]);
        } else {
          params.set(value[0], value[1]);
        }
      })
      const search = params.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    },
    [pathname, router, searchParams]
  );

  return {
    createQueryString
  }
}