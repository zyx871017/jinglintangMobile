import { fetchLogin, fetchRegister } from "@/service/login";
import { NextApiRequest, NextApiResponse } from "next";
import { Cookie } from 'next-cookie';

async function registerApi(req: NextApiRequest, res: NextApiResponse) {
  const { account, password } = req.body;
  const resData = await fetchRegister({ account, password });
  const { code, msg, data } = resData;
  if (code === 200) {
    const cookies = Cookie.fromApiRoute(req, res);
    const path = "/";
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
    cookies.set('uid', data.id, { path, expires, httpOnly: true });
    cookies.set('username', data.account, { path, expires, httpOnly: true });
    res.status(200).json({ code: 0, msg: 'success' });
  } else {
    res.status(200).json({ code: -1, msg: msg });
  }
}

export default registerApi;
