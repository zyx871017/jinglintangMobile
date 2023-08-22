import request from "./fetch";

interface IFTopicCommentList {
  topicId?: number;
  pageSize: number;
  pageNo: number;
}
export async function fetchTopicCommentList(params: IFTopicCommentList) {
  return request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/topic/comment/page`, params);
}

export async function fetchTagList() {
  return request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/topic/tag/list`);
}
