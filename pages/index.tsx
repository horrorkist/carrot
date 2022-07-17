import useUser from "../lib/useUser";
import useSWR from "swr";
import { Like, Tweet, User } from "@prisma/client";
import CompTweet from "../components/Tweet";
import Link from "next/link";

interface TweetWithUser extends Tweet {
  user: User;
  likes: Like[];
}

interface TweetsResponse {
  ok: boolean;
  tweets: TweetWithUser[];
}

export default function Home() {
  const { user } = useUser();
  const { data } = useSWR<TweetsResponse>("/api/tweets");
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen py-4 space-y-4 bg-blue-500">
      <div>
        <Link href="/write">
          <a className="px-4 py-2 text-lg text-blue-500 bg-white rounded-lg">
            Send Tweet
          </a>
        </Link>
      </div>
      <div className="flex flex-col space-y-4">
        {data
          ? data.tweets.map((tweet) => (
              <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
                <a>
                  <CompTweet
                    id={tweet.id}
                    createdBy={tweet.user}
                    text={tweet.text}
                    likes={tweet.likes.length}
                    isThisUserLiked={tweet.likes.some(
                      (like) => like.userId === user?.id
                    )}
                  />
                </a>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
}
