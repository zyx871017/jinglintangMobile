import styles from './index.module.scss';
import Link from 'next/link';

const Footer = () => {
  return <div className={styles.footerContent}>
    <div className={styles.footerText}>免责申明：会员言论仅代表个人观点，本站不承担由此引起的法律责任</div>
    <div className={styles.footerText}>不良信息监督举报邮箱及电话：1271889202@qq.com</div>
  </div>
}

export default Footer;
