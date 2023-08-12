import Link from 'next/link';
import styles from './index.module.scss';
import qs from 'qs';

interface IProps {
  onChange: Function;
  total: number;
  pageNo: number;
  baseUrl?: string;
  query: Record<string, string>
}

const Pagination = (props: IProps) => {
  const pageSize = 10;
  const { pageNo, total, baseUrl = '/topic/allTopic', query } = props;
  const totalPage = Math.ceil(total / pageSize);

  const renderLastButton = () => {
    if (pageNo === 1) {
      return null;
    } else {
      return <Link
        className={styles.pageButton}
        href={`${baseUrl}?${qs.stringify({ ...query, pageNo: pageNo - 1 })}`}
      >上一页</Link>
    }
  }

  const renderNextButton = () => {
    if (pageNo === totalPage) {
      return null;
    } else {
      return <Link
        className={styles.pageButton}
        href={`${baseUrl}?${qs.stringify({ ...query, pageNo: pageNo + 1 })}`}
      >下一页</Link>
    }
  }

  return <div className={styles.pageContent}>
    {renderLastButton()}
    <span className={styles.pageText}>{pageNo} / {totalPage}</span>
    {renderNextButton()}
  </div>
}

export default Pagination;
