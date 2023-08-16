import request from "./fetch";

interface IFLogin {
  account: string;
  password: string;
}
export async function fetchLogin(params: IFLogin) {
  return request.post('http://bj.jinglintang.club:8000/jlt-api-web/user/login', params).catch(e => e.response.data);
}

interface IFRegister {
  account: string;
  password: string;
}
export async function fetchRegister(params: IFRegister) {
  return request.post('http://bj.jinglintang.club:8000/jlt-api-web/user/register', params).catch(e => e.response.data);
}
