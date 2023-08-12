import { NextPage } from "next";
import { commentList } from '@/constant/commentListData';
import styles from './index.module.scss';
import CommentItem from "@/components/CommentItem";
import Pagination from "@/components/Pagination";

export async function getServerSideProps(ctx: any) {
  const query = ctx.query;
  let pageNo = 1;

  if (!isNaN(Number(query.pageNo))) {
    pageNo = Number(query.pageNo);
  }

  return {
    props: {
      commentList,
      total: 221,
      pageNo
    }
  }
}

interface IProps {
  commentList: any[];
  total: number;
  pageNo: number;
}

const CommentList: NextPage<IProps> = (props) => {
  const { commentList, total, pageNo } = props;
  return <div className={styles.pageContent}>
    <div className={styles.commentContent}>
      <div className={styles.titleContent}>
        <span className={styles.title}>网友评价</span>
      </div>
      <div className={styles.commentList}>
        {commentList.map(comment => <CommentItem key={comment.id} comment={comment} />)}
      </div>
    </div>
    <Pagination query={{}} baseUrl="/commentList" total={total} pageNo={pageNo} onChange={() => { }} />
  </div>
}

export default CommentList;
