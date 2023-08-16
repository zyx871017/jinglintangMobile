import { NextPage } from "next";
import Link from "next/link";
import { Image as AntImage } from 'antd';
import styles from './index.module.scss';
import { topicType } from "..";
import Pagination from "@/components/Pagination";
import { fetchAllTopic } from "@/service/allTopic";

export async function getServerSideProps(ctx: any) {
  const query = ctx.query
  let pageNo = 1;
  if (!isNaN(Number(query.pageNo))) {
    pageNo = Number(query.pageNo);
  }
  const search = query.search;
  const data = await fetchAllTopic({
    pageNo,
    pageSize: 10,
    title: search,
    isStaff: false
  });
  const { records, total } = data.data;
  return {
    props: {
      allTopicList: records,
      pageNo,
      search,
      total
    }
  }
}

interface IProps {
  allTopicList: topicType[];
  pageNo: number;
  search: string;
  total: number;
}

const SearchTopic: NextPage<IProps> = (props) => {
  const { allTopicList, pageNo, total, search } = props;

  return <div className={styles.pageContent}>
    <div className={styles.searchContent}>
      <span>搜索关键字：{search}</span>
    </div>
    <div className={styles.listContent}>
      {allTopicList.map(topic => <div key={topic.id} className={styles.topicContent}>
        <div className={styles.imageContent}>
          <Link href={`/topic/${topic.id}`}>
            <AntImage preview={false} width="1.5rem" height="1.5rem" alt="" src={topic.imgUrl}></AntImage>
          </Link>
        </div>
        <div className={styles.rightContent}>
          <Link href={`/topic/${topic.id}`}>
            <div className={styles.topicTitle}>{topic.title}</div>
          </Link>
          <div className={styles.infoRow}>
            <span className={styles.infoRate}>{topic.score}分</span>
            <Link href={`/topic/${topic.id}`}>
              <span className={styles.infoComment}>{topic.commentTotal}条评价</span>
            </Link>
          </div>
          <div className={styles.infoRow}>
            <Link href={`/topic/${topic.id}`}>
              <span className={styles.infoAddress}>{topic.address}</span>
            </Link>
          </div>
        </div>
      </div>)}
    </div>
    <Pagination query={{}} total={total} pageNo={pageNo} onChange={() => { }} />
  </div>
}

export default SearchTopic;
