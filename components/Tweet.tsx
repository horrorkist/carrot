import { Like, Tweet, User } from "@prisma/client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import useUser from "../lib/useUser";
import useMutation from "../lib/useMutation";

interface TweetProps {
  createdBy: User;
  id: number;
  text: String;
  likes: number;
  isThisUserLiked: boolean;
}

interface TweetWithUser extends Tweet {
  user: User;
  likes: Like[];
}

interface TweetResponse {
  ok: boolean;
  tweet: TweetWithUser;
  count: number;
  isLiked: boolean;
}

export default function CompTweet({
  createdBy,
  id,
  text,
  likes,
  isThisUserLiked,
}: TweetProps) {
  const { user } = useUser();
  const { mutate, data } = useSWR<TweetResponse>(`/api/tweets/${id}`);
  const [toggleLike] = useMutation(`/api/like`);
  const onLikeClick = () => {
    if (data) {
      toggleLike({ id });
      mutate(
        {
          ...data,
          count: data.isLiked ? data.count - 1 : data.count + 1,
          isLiked: !data.isLiked,
        },
        false
      );
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-[400px] bg-white rounded-lg border-2 border-slate-300 p-4">
      <div className="flex items-center space-x-2">
        <div className="w-12 h-12 rounded-full bg-slate-300" />
        <div>
          <span className="text-xl">{data?.tweet.user.name}</span>
        </div>
      </div>
      <div className="pt-2 pb-4 border-b border-b-slate-300">
        <span>{data?.tweet.text}</span>
      </div>
      <div className="flex">
        <button onClick={onLikeClick} className="flex p-1 space-x-2">
          <svg
            className="w-6 h-6"
            fill={data?.isLiked ? "red" : "gray"}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <span>{data?.count}</span>
          </div>
        </button>
      </div>
    </div>
  );
}
