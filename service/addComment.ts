import request from "./fetch";

interface IFAddComment {
  topicId: number;
  score: number;
  comment: string;
}
export async function fetchAddComment(params: IFAddComment, uid: number) {
  return request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/comment/create`, params, { headers: { userId: uid } }).catch(e => e);
}
