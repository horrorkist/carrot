import { useState } from "react";

export default function useMutation(
  url: string
): [
  (data: any) => void,
  { loading: boolean; data: undefined | any; error: undefined | any }
] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  async function mutation(data: any) {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const parsed = await response.json();
      setData(parsed);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
    return;
  }

  return [mutation, { loading, data, error }];
}
