import request from "./fetch";

interface IFAddComment {
  topicId: number;
  score: number;
  comment: string;
}
export async function fetchAddComment(params: IFAddComment, uid: number) {
  return request.post('http://bj.jinglintang.club:8000/jlt-api-web/comment/create', params, { headers: { userId: uid } }).catch(e => e);
}
