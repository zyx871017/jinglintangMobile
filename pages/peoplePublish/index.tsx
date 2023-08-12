import { NextPage } from "next";
import { Form, Input, Button, message } from 'antd';
import styles from './index.module.scss';

const PeoplePublish: NextPage = () => {
  const [formIns] = Form.useForm();

  const confirmButton = () => {
    const formData: any = formIns.getFieldsValue();
    if (!formData.name) {
      message.error('请输入昵称');
      return;
    }
    if (!formData.phone && !formData.weixin && !formData.qq) {
      message.error('联系方式请至少选择一种填写');
      return;
    }
  }
  return <div className={styles.pageContent}>
    <div className={styles.title}>个人信息</div>
    <div className={styles.divider}></div>
    <Form initialValues={{ tag: 1 }} colon={false} form={formIns} className={styles.storeForm}>
      <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="昵称" name="name">
        <Input placeholder="请输入昵称" />
      </Form.Item>
      <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="电话" name="phone">
        <Input placeholder="请输入联系电话" />
      </Form.Item>
      <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="微信" name="weixin">
        <Input placeholder="请输入微信" />
      </Form.Item>
      <Form.Item extra="联系方式至少需要填写其中一项" labelCol={{ span: 2 }} className={styles.inputItem} label="QQ" name="qq">
        <Input placeholder="请输入QQ" />
      </Form.Item>
    </Form>
    <div className={styles.buttonContent}>
      <Button className={styles.publishButton} onClick={confirmButton}>确认发布</Button>
    </div>
  </div>
}

export default PeoplePublish;
