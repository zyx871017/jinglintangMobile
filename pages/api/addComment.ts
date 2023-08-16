import { fetchAddComment } from "@/service/addComment";
import { NextApiRequest, NextApiResponse } from "next";
import { Cookie } from 'next-cookie';

async function addComment(req: NextApiRequest, res: NextApiResponse) {
  const cookies = Cookie.fromApiRoute(req, res);
  const uid: any = cookies.get('uid');
  if (uid) {
    const params = req.body;
    const resData = await fetchAddComment(params, uid.value);
    if (resData.code === 200) {
      res.status(200).json({ code: 0, msg: 'success' });
    } else {
      res.status(200).json({ code: -1, msg: resData.msg });
    }
  } else {
    res.status(200).json({ code: 401, msg: '用户未登录' });
  }
}

export default addComment;
