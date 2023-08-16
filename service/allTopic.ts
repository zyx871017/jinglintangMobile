import request from "./fetch";

interface IFTopicCommentList {
  isStaff: boolean;
  tagId?: number;
  title: string;
  pageSize: number;
  pageNo: number;
}
export async function fetchAllTopic(params: IFTopicCommentList) {
  return request.post('http://bj.jinglintang.club:8000/jlt-api-web/topic/page', params);
}