import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name } = req.body;
  const alreadyExist = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (alreadyExist) {
    return res.json({
      ok: false,
      error: "This email is already in use.",
    });
  }
  const account = await db.user.create({
    data: {
      email,
      name,
    },
  });
  return res.json({
    ok: true,
    account,
  });
}
