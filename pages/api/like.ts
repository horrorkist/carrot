import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { withApiSession } from "../../lib/withSession";
import withHandler from "../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    body: { id },
  } = req;

  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      likes: true,
    },
  });

  let likeId;
  const exist = tweet?.likes.some((like) => {
    likeId = like.id;
    return like.userId === user?.id;
  });

  if (!exist) {
    await db.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  } else {
    await db.like.delete({
      where: {
        id: likeId,
      },
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
