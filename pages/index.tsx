import Image from 'next/image';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons'
import { Image as AntImage } from 'antd';
import hotImage from '@/public/hotImage.jpeg';
import Banner from '@/components/Banner';
import styles from './index.module.scss';
import bannerImg from '@/public/bannerImg.jpeg';
import bannerImg1 from '@/public/bannerImg1.jpeg';
import hotIcon from '@/public/hot.png';
import mastIcon from '@/public/mast.png';
import allTopicImage from '@/public/allTopic.png';
import couponImage from '@/public/coupon.png';
import joinUsImage from '@/public/joinUs.png';
import commentImage from '@/public/comment.png';
import request from '@/service/fetch';
import { fallImage } from '@/constant';

export type topicType = {
  id: number;
  title: string;
  score: number;
  address: string;
  commentTotal: number;
  imgUrl: string;
}

interface IProps {
  hotTopicList: topicType[];
  mastTopicList: topicType[];
  recommendList: topicType[];
}

export async function getServerSideProps() {
  const data = await request.get(`http://${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}/jlt-api-web/`);
  const { hot: hotTopicList, recommend: mastTopicList, bottom: recommendList } = data.data;
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
      <div className={styles.navContent}>
        <Link className={styles.navButton} href="/topic/allTopic" >
          <div className={styles.navIcon}>
            <Image className={styles.navImage} alt="" src={allTopicImage}></Image>
          </div>
          <span className={styles.navText}>所有商家</span>
        </Link>
        <Link className={styles.navButton} href="/coupon" >
          <div className={styles.navIcon}>
            <Image className={styles.navImage} alt="" src={couponImage}></Image>
          </div>
          <span className={styles.navText}>优惠</span>
        </Link>
        <Link className={styles.navButton} href="/joinUs" >
          <div className={styles.navIcon}>
            <Image className={styles.navImage} alt="" src={joinUsImage}></Image>
          </div>
          <span className={styles.navText}>加入</span>
        </Link>
        <Link className={styles.navButton} href="/commentList" >
          <div className={styles.navIcon}>
            <Image className={styles.navImage} alt="" src={commentImage}></Image>
          </div>
          <span className={styles.navText}>评论</span>
        </Link>
      </div>
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
                <AntImage fallback={fallImage} preview={false} width="3.32rem" height="1.92rem" src={topic.imgUrl} alt=""></AntImage>
              </div>
              <div className={styles.topicInfoContent}>
                <div className={styles.title}>{topic.title}</div>
                <div className={styles.infoRow}>
                  <span className={styles.infoRate}>{topic.score}分</span>
                  <span className={styles.infoComment}>{topic.commentTotal}条评价</span>
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
                <AntImage fallback={fallImage} preview={false} width="3.32rem" height="1.92rem" src={topic.imgUrl} alt=""></AntImage>
              </div>
              <div className={styles.topicInfoContent}>
                <div className={styles.title}>{topic.title}</div>
                <div className={styles.infoRow}>
                  <span className={styles.infoRate}>{topic.score}分</span>
                  <span className={styles.infoComment}>{topic.commentTotal}条评价</span>
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
            <AntImage fallback={fallImage} preview={false} width="100%" height="4rem" src={mainTopic.imgUrl || fallImage} alt="" ></AntImage>
            <div className={styles.mainCardInfo}>
              <div className={styles.mainCardTitle}>{mainTopic.title}</div>
              <div className={styles.mainInfoRow}>
                <span className={styles.mainInfoRate}>{mainTopic.score}分</span>
                <span className={styles.mainInfoComment}>{mainTopic.commentTotal}条评价</span>
              </div>
              <div className={styles.mainInfoRow}>
                <span className={styles.mainAddress}>{mainTopic.address}</span>
              </div>
            </div>
          </div>
          <div className={styles.otherTopicContent}>
            {otherTopicList.map(topic => <Link href={`/topic/${topic.id}`} key={topic.id} className={styles.otherCard}>
              <AntImage preview={false} width="3.32rem" height="1.92rem" src={topic.imgUrl || fallImage} alt="" ></AntImage>
              <div className={styles.otherCardInfo}>
                <div className={styles.otherCardTitle}>{topic.title}</div>
                <div className={styles.otherInfoRow}>
                  <span className={styles.otherInfoRate}>{topic.score}分</span>
                  <span className={styles.otherInfoComment}>{topic.commentTotal}条评价</span>
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
