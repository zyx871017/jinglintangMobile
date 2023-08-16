import { useState } from "react";
import { Button, Input, message } from "antd";
import { NextPage } from "next";
import cryptoJs from 'crypto-js';
import styles from './index.module.scss';
import request from "@/service/fetch";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const confirmLogin = async () => {
    if (!username) {
      message.error('请输入用户名');
    } else if (!password) {
      message.error('请设置密码');
    } else if (!confirmPassword) {
      message.error('请确认密码');
    } else if (confirmPassword !== password) {
      message.error('两次密码输入不同');
    } else {
      const IPassword = cryptoJs.SHA256(password).toString();
      const res: any = await request.post('/api/register', { account: username, password: IPassword });
      if (res.code === 0) {
        const redir: any = router.query?.redir || '/login';
        router.replace(redir);
      } else {
        message.error(res.msg);
      }
    }
  }
  return <div className={styles.pageContent}>
    <div className={styles.loginTitle}>用户名</div>
    <Input onChange={e => setUsername(e.target.value)} className={styles.loginInput} placeholder="请输入用户名"></Input>
    <div className={styles.loginTitle}>密码</div>
    <Input.Password onChange={e => setPassword(e.target.value)} className={styles.loginInput} placeholder="请输入密码"></Input.Password>
    <div className={styles.loginTitle}>确认密码</div>
    <Input.Password onChange={e => setConfirmPassword(e.target.value)} className={styles.loginInput} placeholder="请输入密码"></Input.Password>
    <Button onClick={confirmLogin} className={styles.loginButton}>注册</Button>
  </div>
};

export default Login;
