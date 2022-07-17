import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import withHandler from "../../lib/withHandler";
import { withApiSession } from "../../lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { text },
    session: { user },
  } = req;

  let tweet;

  try {
    tweet = await db.tweet.create({
      data: {
        text,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
    });
  }

  return res.json({
    ok: true,
    tweet,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
