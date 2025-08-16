import { useEffect, useState } from "react";

export function useGithubStars(repo: string) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`);
        if (!res.ok) return;
        const data = await res.json();
        setStars(data.stargazers_count ?? null);
      } catch {
        setStars(null);
      }
    }
    fetchStars();
  }, [repo]);

  return stars;
}
