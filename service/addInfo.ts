import request from "./fetch";

interface IFAddInfo {
  title: string;
  telephone: string;
  wechat: string;
  qq: string;
  tagId: number;
  address: string;
  openingHour: string;
  description: string;
  type: number;
}
export async function fetchAddInfo(params: IFAddInfo) {
  return request.post('http://bj.jinglintang.club:8000/jlt-api-web/shop/create', params).catch(e => e);
}