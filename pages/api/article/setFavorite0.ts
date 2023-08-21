import { NextApiRequest, NextApiResponse } from "next";

async function setFavorite0(req: NextApiRequest, res: NextApiResponse) {
  const { topicId } = req.body;
  res.status(200).json({ code: 0, msg: 'success' });
}

export default setFavorite0;
