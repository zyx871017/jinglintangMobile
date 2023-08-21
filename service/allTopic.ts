import request from "./fetch";

interface IFTopicCommentList {
  isStaff: boolean;
  tagId?: number;
  title: string;
  pageSize: number;
  pageNo: number;
}
export async function fetchAllTopic(params: IFTopicCommentList) {
  return request.post(`http://${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}/jlt-api-web/topic/page`, params);
}