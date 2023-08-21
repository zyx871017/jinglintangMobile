import request from "./fetch";

interface IFAddComment {
  topicId: number;
  score: number;
  comment: string;
}
export async function fetchAddComment(params: IFAddComment, uid: number) {
  return request.post(`http://${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}/jlt-api-web/comment/create`, params, { headers: { userId: uid } }).catch(e => e);
}
