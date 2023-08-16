import { useState } from "react";
import { Button, Input, Rate, message } from "antd";
import { NextPage } from "next";
import Image from "next/image";
import boyImage from '@/public/boy-1.png';
import styles from './index.module.scss';
import { useRouter } from "next/router";
import request from "@/service/fetch";

export async function getServerSideProps(ctx: any) {
  const username = ctx.req.cookies?.username;
  return {
    props: {
      username
    }
  }
}

const WriteComment: NextPage<{ username: string }> = (props) => {
  const { username } = props;
  const router = useRouter();
  const [commentRate, setCommentRate] = useState(4.5);
  const [commentText, setCommentText] = useState('');
  const publishComment = async () => {
    const { id } = router.query;
    const res: any = await request.post('/api/addComment', {
      topicId: Number(id),
      score: commentRate,
      comment: commentText
    });
    if (res.code === 401) {
      router.push(`/login?redir=${router.pathname}`);
    } else if (res.code === -1) {
      message.error(res.msg);
    } else {
      router.push('/publishSuccess');
    }
  }
  return <div className={styles.pageContent}>
    <div className={styles.userComment}>
      <Image className={styles.commentAvatar} alt="" src={boyImage}></Image>
      <div className={styles.rightContent}>
        <div className={styles.commentUser}>{username}</div>
        <Rate className={styles.rate} value={commentRate} onChange={setCommentRate} />
        <Input.TextArea className={styles.commentText} autoSize={{ minRows: 3, maxRows: 3 }} onChange={e => setCommentText(e.target.value)} />
        <Button onClick={publishComment} className={styles.publishButton}>发表</Button>
      </div>
    </div>
  </div>
}

export default WriteComment;