import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { withApiSession } from "../../lib/withSession";
import withHandler from "../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const account = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!account) {
    return res.json({
      ok: false,
      error: "There's no account with this email.",
    });
  }

  req.session.user = {
    id: account.id,
  };

  await req.session.save();

  return res.status(200).json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
