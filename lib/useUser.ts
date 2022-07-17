import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface UserResponse {
  ok: boolean;
  account: User;
}

export default function useUser() {
  const { data } = useSWR<UserResponse>("/api/me");
  const router = useRouter();
  useEffect(() => {
    if (!data) return;
    if (!data.ok) {
      router.push("/create-account");
    }
  }, [data, router]);

  return { user: data?.account };
}
