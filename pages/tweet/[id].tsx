import useSWR from "swr";
import { useRouter } from "next/router";
import CompTweet from "../../components/Tweet";
import { Like, Tweet, User } from "@prisma/client";
import useUser from "../../lib/useUser";

interface TweetWithUser extends Tweet {
  user: User;
  likes: Like[];
}

interface TweetResponse {
  ok: boolean;
  tweet: TweetWithUser;
}

export default function TweetId() {
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const { mutate, data } = useSWR<TweetResponse>(`/api/tweets/${id}`);
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen space-y-4 bg-blue-500">
      {data ? (
        <CompTweet
          createdBy={data.tweet.user}
          id={data.tweet.id}
          text={data.tweet.text}
          likes={data.tweet.likes.length}
          isThisUserLiked={data.tweet.likes.some(
            (like) => like.id === user?.id
          )}
        ></CompTweet>
      ) : null}
    </div>
  );
}
