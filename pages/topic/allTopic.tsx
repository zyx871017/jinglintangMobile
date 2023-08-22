import { useState } from "react";
import classNames from "classnames";
import { NextPage } from "next";
import Link from "next/link";
import { Image as AntImage } from 'antd';
import styles from './allTopic.module.scss';
import { topicType } from "..";
import Pagination from "@/components/Pagination";
import { CaretRightOutlined } from "@ant-design/icons";
import request from "@/service/fetch";
import { fallImage } from "@/constant";
import { fetchTagList } from "@/service/topicDetail";

export async function getServerSideProps(ctx: any) {
  const query = ctx.query;
  const tagQuery: number = query.tag ? Number(query.tag) : 0;
  const tagListData = await fetchTagList();
  const tagList = tagListData.data;
  const currentTag = tagList.find((tag: any) => tag.id === tagQuery);
  let pageNo = 1;
  if (!isNaN(Number(query.pageNo))) {
    pageNo = Number(query.pageNo);
  }
  const params = {
    isStaff: false,
    pageNo,
    pageSize: 10,
    tagId: currentTag?.id || ''
  }
  const data = await request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/topic/page`, params);
  const { records, total, current, } = data.data;
  return {
    props: {
      tagList: tagListData.data,
      allTopicList: records,
      total,
      pageNo: current,
      tagStr: currentTag?.name || '不限',
      tagId: currentTag?.id || ''
    }
  }
}

interface IProps {
  tagList: { id: number, name: string }[];
  allTopicList: topicType[];
  total: number;
  pageNo: number;
  tagStr: string;
  tagId: string;
}

const AllTopic: NextPage<IProps> = (props) => {
  const { tagList, total = 212, pageNo = 5, tagStr, tagId, allTopicList } = props;
  const [showFilter, setShowFilter] = useState(false);

  return <div className={styles.pageContent}>
    <div className={styles.filterContent}>
      <div className={styles.currentTag}>
        <CaretRightOutlined className={styles.currentTagIcon} />
        <span onClick={() => setShowFilter(!showFilter)} className={styles.currentTagText}>{tagStr}</span>
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
        >{tag.name}</Link>)}
      </div>
    </div>
    <div className={styles.listContent}>
      {allTopicList.map(topic => <Link href={`/topic/${topic.id}`} key={topic.id} className={styles.topicContent}>
        <div className={styles.imageContent}>
          <AntImage preview={false} fallback={fallImage} alt="" src={topic.imgUrl || fallImage}></AntImage>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.topicTitle}>{topic.title}</div>
          <div className={styles.infoRow}>
            <span className={styles.infoRate}>{topic.score}分</span>
            <span>{topic.commentTotal}条评价</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoAddress}>{topic.address}</span>
          </div>
        </div>
      </Link>)}
    </div>
    <Pagination query={{ tag: tagId }} total={total} pageNo={pageNo} onChange={() => { }} />
  </div >;
}

export default AllTopic;
