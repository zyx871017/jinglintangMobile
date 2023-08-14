import { NextPage } from "next";
import styles from './index.module.scss';
import { Button, Input } from "antd";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();

  const gotoSignUp = () => { router.push('/signUp') }
  const confirmLogin = () => { }
  return <div className={styles.pageContent}>
    <div className={styles.loginTitle}>用户名</div>
    <Input className={styles.loginInput} placeholder="请输入用户名"></Input>
    <div className={styles.loginTitle}>密码</div>
    <Input.Password className={styles.loginInput} placeholder="请输入密码"></Input.Password>
    <Button onClick={confirmLogin} className={styles.loginButton}>登录</Button>
    <Button onClick={gotoSignUp} className={styles.signUpButton}>快速注册</Button>
  </div>
};

export default Login;
