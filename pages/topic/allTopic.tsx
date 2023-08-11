import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from './allTopic.module.scss';
import { allTopicList, tagList } from "@/constant/allTopicData";
import classNames from "classnames";
import { topicType } from "..";
import Pagination from "@/components/Pagination";
import { CaretRightOutlined } from "@ant-design/icons";
import { useState } from "react";

export async function getServerSideProps(ctx: any) {
  const query = ctx.query
  let pageNo = 1;
  if (!isNaN(Number(query.pageNo))) {
    pageNo = Number(query.pageNo);
  }
  return {
    props: {
      tagList,
      allTopicList,
      pageNo
    }
  }
}

interface IProps {
  tagList: { id: number, title: string }[];
  allTopicList: topicType[];
  total: number;
  pageNo: number;
}

const AllTopic: NextPage<IProps> = (props) => {
  const { tagList, total = 212, pageNo = 5 } = props;
  const [showFilter, setShowFilter] = useState(false);

  return <div className={styles.pageContent}>
    <div className={styles.filterContent}>
      <div className={styles.currentTag}>
        <CaretRightOutlined className={styles.currentTagIcon} />
        <span onClick={() => setShowFilter(!showFilter)} className={styles.currentTagText}>不限</span>
      </div>
      <div className={classNames({
        [styles.tagSelect]: true,
        [styles.hide]: !showFilter
      })}>
        <Link onClick={() => setShowFilter(false)} href={`/topic/allTopic`} className={styles.filterTag}>不限</Link>
        {tagList.map(tag => <Link
          className={styles.filterTag}
          key={tag.id}
          onClick={() => setShowFilter(false)}
          href={`/topic/allTopic?tag=${tag.id}`}
        >{tag.title}</Link>)}
      </div>
    </div>
    <div className={styles.listContent}>
      {allTopicList.map(topic => <Link href={`/topic/${topic.id}`} key={topic.id} className={styles.topicContent}>
        <div className={styles.imageContent}>
          <Image alt="" src={topic.image}></Image>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.topicTitle}>{topic.title}</div>
          <div className={styles.infoRow}>
            <span className={styles.infoRate}>{topic.rate}分</span>
            <span>{topic.commentCount}条评价</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoAddress}>{topic.address}</span>
          </div>
        </div>
      </Link>)}
    </div>
    <Pagination total={total} pageNo={pageNo} onChange={() => { }} />
  </div >;
}

export default AllTopic;
