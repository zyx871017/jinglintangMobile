import { fetchAddInfo } from "@/service/addInfo";
import { NextApiRequest, NextApiResponse } from "next";
import { Cookie } from 'next-cookie';

async function joinUs(req: NextApiRequest, res: NextApiResponse) {
  const cookies = Cookie.fromApiRoute(req, res);
  const uid = cookies.get('uid');
  if (uid) {
    const params = req.body;
    const resData = await fetchAddInfo(params);
    if (resData.code === 200) {
      res.status(200).json({ code: 0, msg: 'success' });
    } else {
      res.status(200).json({ code: -1, msg: resData.msg });
    }
  } else {
    res.status(200).json({ code: 401, msg: '用户未登录' });
  }
}

export default joinUs;
