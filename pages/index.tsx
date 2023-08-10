import Image from 'next/image';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons'
import Banner from '@/components/Banner';
import styles from './index.module.scss';
import bannerImg from '@/public/bannerImg.jpeg';
import bannerImg1 from '@/public/bannerImg1.jpeg';
import hotIcon from '@/public/hot.png';
import mastIcon from '@/public/mast.png';
import { hotTopicList, mastTopicList, recommendList } from '@/constant/indexPageData';

export type topicType = {
  id: number;
  title: string;
  rate: number;
  address: string;
  commentCount: number;
  image: string;
}

interface IProps {
  hotTopicList: topicType[];
  mastTopicList: topicType[];
  recommendList: topicType[];
}

export async function getServerSideProps() {
  return {
    props: {
      hotTopicList,
      mastTopicList,
      recommendList
    }
  };
}

export default function Home(props: IProps) {
  const { hotTopicList, mastTopicList, recommendList: [mainTopic, ...otherTopicList] } = props;
  const data = [{
    title: '测试',
    image: bannerImg
  }, {
    title: '测试2',
    image: bannerImg1
  }, {
    title: '测试3',
    image: bannerImg1
  }]

  return (
    <div className={styles.mainContent}>
      <Banner data={data} />
      <div className={styles.rowCard}>
        <div className={styles.hotCard}>
          <div className={styles.titleContent}>
            <div className={styles.leftContent}>
              <Image src={hotIcon} className={styles.cardIcon} alt="" />
              <span className={styles.title}>热门推荐</span>
            </div>
            <div className={styles.rightContent}>
              <Link className={styles.moreLink} href="/topic/allTopic">全部商家</Link>
              <RightOutlined className={styles.moreIcon} />
            </div>
          </div>
          <div className={styles.cardContent}>
            {hotTopicList.map(topic => <Link href={`/topic/${topic.id}`} className={styles.topicContent} key={topic.id}>
              <div className={styles.topicImage}>
                <Image width={170} height={96} src={topic.image} alt=""></Image>
              </div>
              <div className={styles.topicInfoContent}>
                <div className={styles.title}>{topic.title}</div>
                <div className={styles.infoRow}>
                  <span className={styles.infoRate}>{topic.rate}分</span>
                  <span className={styles.infoComment}>{topic.commentCount}条评价</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.address}>{topic.address}</span>
                </div>
              </div>
            </Link>)}
          </div>
        </div>
      </div>
      <div className={styles.rowCard}>
        <div className={styles.hotCard}>
          <div className={styles.titleContent}>
            <div className={styles.leftContent}>
              <Image src={mastIcon} className={styles.cardIcon} alt="" />
              <span>站长推荐</span>
            </div>
            <div className={styles.rightContent}>
              <Link className={styles.moreLink} href="/topic/allTopic">全部商家</Link>
              <RightOutlined className={styles.moreIcon} />
            </div>
          </div>
          <div className={styles.cardContent}>
            {mastTopicList.map(topic => <Link href={`/topic/${topic.id}`} className={styles.topicContent} key={topic.id}>
              <div className={styles.topicImage}>
                <Image width={170} height={96} src={topic.image} alt=""></Image>
              </div>
              <div className={styles.topicInfoContent}>
                <div className={styles.title}>{topic.title}</div>
                <div className={styles.infoRow}>
                  <span className={styles.infoRate}>{topic.rate}分</span>
                  <span className={styles.infoComment}>{topic.commentCount}条评价</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.address}>{topic.address}</span>
                </div>
              </div>
            </Link>)}
          </div>
        </div>
      </div>
      <div className={styles.recommendCard}>
        <div className={styles.titleContent}>
          <div className={styles.leftContent}>
            <Image src={hotIcon} className={styles.cardIcon} alt="" />
            <span>热门推荐</span>
          </div>
          <div className={styles.rightContent}>
            <Link className={styles.moreLink} href="/topic/allTopic">全部商家</Link>
            <RightOutlined className={styles.moreIcon} />
          </div>
        </div>
        <div className={styles.topicContent}>
          <div className={styles.mainCard}>
            <Image className={styles.mainImage} src={mainTopic.image} alt="" ></Image>
            <div className={styles.mainCardInfo}>
              <div className={styles.mainCardTitle}>{mainTopic.title}</div>
              <div className={styles.mainInfoRow}>
                <span className={styles.mainInfoRate}>{mainTopic.rate}分</span>
                <span className={styles.mainInfoComment}>{mainTopic.commentCount}条评价</span>
              </div>
              <div className={styles.mainInfoRow}>
                <span className={styles.mainAddress}>{mainTopic.address}</span>
              </div>
            </div>
          </div>
          <div className={styles.otherTopicContent}>
            {otherTopicList.map(topic => <Link href={`/topic/${topic.id}`} key={topic.id} className={styles.otherCard}>
              <Image className={styles.otherCardImage} src={topic.image} alt="" ></Image>
              <div className={styles.otherCardInfo}>
                <div className={styles.otherCardTitle}>{topic.title}</div>
                <div className={styles.otherInfoRow}>
                  <span className={styles.otherInfoRate}>{topic.rate}分</span>
                  <span className={styles.otherInfoComment}>{topic.commentCount}条评价</span>
                </div>
                <div className={styles.otherInfoRow}>
                  <span className={styles.otherAddress}>{topic.address}</span>
                </div>
              </div>
            </Link>)}
          </div>
        </div>
      </div>
    </div>
  )
}
