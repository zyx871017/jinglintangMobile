import { useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './index.module.scss';
import { LeftOutlined } from '@ant-design/icons';

const Navbar = () => {
  const { pathname } = useRouter();
  const [search, setSearch] = useState('');

  const goBack = () => {
    window.history.go(-1);
  }
  return <header className={styles.navbar}>
    <div className={styles.navContent}>
      {pathname === '/' ? null : <LeftOutlined onClick={goBack} className={styles.backIcon} />}
      <div className={styles.logoContent}>京林堂</div>
    </div>
    <div className={styles.navMenuContent}>
      <input
        value={search}
        className={styles.searchInput}
        type="text"
        placeholder="搜索商家"
        onChange={e => setSearch(e.target.value)}
      />
      <Link href={search ? `/searchTopic?search=${search}` : '/topic/allTopic'} className={styles.searchButton} >搜索</Link>
    </div>
  </header>;
}

export default Navbar;
