import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";
import withHandler from "../../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tweets = await db.tweet.findMany({
    include: {
      user: true,
      likes: true,
    },
  });

  return res.status(200).json({
    ok: true,
    tweets,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
