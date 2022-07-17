import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { withApiSession } from "../../lib/withSession";
import withHandler from "../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let account;
  let id;
  if (req.session.user) {
    id = req.session.user.id;
  }

  try {
    account = await db.user.findUnique({
      where: {
        id,
      },
    });
  } catch (e) {
    return res.json({
      ok: false,
    });
  }

  return res.status(200).json({
    ok: true,
    account,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
