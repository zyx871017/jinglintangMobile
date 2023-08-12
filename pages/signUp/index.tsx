import { NextPage } from "next";
import styles from './index.module.scss';
import { Button, Input } from "antd";

const Login: NextPage = () => {

  const gotoSignUp = () => { }
  const confirmLogin = () => { }
  return <div className={styles.pageContent}>
    <div className={styles.loginTitle}>用户名</div>
    <Input className={styles.loginInput} placeholder="请输入用户名"></Input>
    <div className={styles.loginTitle}>密码</div>
    <Input.Password className={styles.loginInput} placeholder="请输入密码"></Input.Password>
    <div className={styles.loginTitle}>确认密码</div>
    <Input.Password className={styles.loginInput} placeholder="请输入密码"></Input.Password>
    <Button onClick={confirmLogin} className={styles.loginButton}>注册</Button>
  </div>
};

export default Login;
