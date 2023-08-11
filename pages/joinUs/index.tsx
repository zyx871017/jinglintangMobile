import { NextPage } from "next";
import Image from 'next/image';
import styles from './index.module.scss';
import storeImage from '@/public/store.png';
import peopleImage from '@/public/people.png';
import Link from "next/link";

interface IProps {

}

const JoinUp: NextPage<IProps> = (props) => {
  return <div className={styles.pageContent}>
    <div className={styles.joinTips}>本平台承诺所有个人信息在未经本人允许的情况下绝不会对外公开！</div>
    <div className={styles.joinContent}>
      <Link href="/storePublish">
        <div className={styles.storeSettleButton}>
          <Image className={styles.storeImage} alt="" src={storeImage} />
          <div className={styles.settledTitle}>商家入驻</div>
        </div>
      </Link>
      <Link href="/peoplePublish">
        <div className={styles.storeSettleButton}>
          <Image className={styles.storeImage} alt="" src={peopleImage} />
          <div className={styles.settledTitle}>个人加入</div>
        </div>
      </Link>
    </div>
  </div>;
}

export default JoinUp;
