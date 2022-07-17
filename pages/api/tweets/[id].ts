import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";
import withHandler from "../../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    query: { id },
  } = req;

  const tweet = await db.tweet.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: true,
      likes: true,
    },
  });

  const count = tweet?.likes.length;

  const isLiked = tweet?.likes.some((like) => like.userId === user?.id);

  return res.status(200).json({
    ok: true,
    tweet,
    count,
    isLiked,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
