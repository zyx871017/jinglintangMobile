import { NextApiRequest, NextApiResponse } from "next";

async function getArticleList(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ code: 0, data: [], msg: 'success' });
}

export default getArticleList;
