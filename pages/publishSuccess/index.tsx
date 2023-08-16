import { NextPage } from "next";
import Image from "next/image";
import successImage from '@/public/approval.png';
import styles from './index.module.scss';
import Link from "next/link";

const PublishSuccess: NextPage = () => {
  return <div className={styles.pageContent}>
    <Image className={styles.successImage} src={successImage} alt=""></Image>
    <div className={styles.successTitle}>登记成功</div>
    <div className={styles.successNote}>客服人员会尽快审核您的信息，如有需要会和您联系，请耐心等候</div>
    <div className={styles.buttonContent}><Link className={styles.backButton} href="/">返回首页</Link></div>
  </div>
}

export default PublishSuccess;
