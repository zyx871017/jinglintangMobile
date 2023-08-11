import { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';
import downIcon from '@/public/down.png';
import classNames from 'classnames';

interface IProps {
  comment: any
}

const CommentItem = (props: IProps) => {
  const { comment } = props;
  const [opening, setOpening] = useState<boolean>(false);
  const textCollapseChange = () => {
    setOpening(!opening);
  }
  return <div key={comment.id} className={styles.commentItem}>
    <Image className={styles.commentAvatar} alt="" src={comment.userAvatar}></Image>
    <div className={styles.rightContent}>
      <div className={styles.username}>{comment.username}</div>
      <div className={styles.infoRate}>{comment.rate}分</div>
      <p className={classNames({
        [styles.commentText]: true,
        [styles.textOpening]: opening
      })}>{comment.commentText}</p>
      <div onClick={textCollapseChange} className={styles.collapseButton}>
        {opening ? '收起评价' : '展开评价'}
        <Image className={classNames({
          [styles.downIcon]: true,
          [styles.iconOpening]: opening
        })} alt="" src={downIcon}></Image>
      </div>
      <div className={styles.imageList}>
        {comment.images.map((img: string, i: number) => <Image className={styles.commentImage} key={i} alt="" src={img}></Image>)}
      </div>
      <div className={styles.commentTime}>{comment.commentTime}</div>
    </div>
  </div>
}

export default CommentItem;
