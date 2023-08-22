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
  return request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/shop/create`, params).catch(e => e);
}