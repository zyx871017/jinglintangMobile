import { NextPage } from "next";
import { Button, Form, Input, Select, message } from 'antd';
import styles from './index.module.scss';
import { tagList } from "@/constant/allTopicData";

const { Option } = Select;

export async function getServerSideProps() {
  return {
    props: {
      tagList
    }
  }
}

interface IProps {
  tagList: { title: string; id: number }[]
}

const StorePublish: NextPage<IProps> = (props) => {
  const { tagList } = props;
  const [formIns] = Form.useForm();
  const valuesChange = (_: any, value: any) => {
  }

  const confirmButton = () => {
    const storeInfo = formIns.getFieldsValue();
    if (!storeInfo.title) {
      message.error('请输入商家名称');
      return;
    }
    if (!storeInfo.qq && !storeInfo.weixin && !storeInfo.phone) {
      message.error('联系方式请至少选择一种录入');
      return;
    }
  }
  return <div className={styles.pageContent}>
    <div className={styles.title}>店铺信息</div>
    <div className={styles.divider}></div>
    <Form initialValues={{ tag: 1 }} onValuesChange={valuesChange} colon={false} form={formIns} className={styles.storeForm}>
      <Form.Item className={styles.inputItem}>
        <div className={styles.secTitle}>基本信息</div>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="店铺名称" name="title">
          <Input placeholder="请输入店铺名称" />
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="所属区域" name="tag">
          <Select>
            {tagList.map(tag => <Option key={tag.id} value={tag.id}>{tag.title}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="店铺地址" name="address">
          <Input placeholder="请输入店铺地址" />
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="营业时间" name="openingTime">
          <Input placeholder="请输入店铺营业时间" />
        </Form.Item>
      </Form.Item>
      <Form.Item className={styles.inputItem}>
        <div className={styles.secTitle}>联系方式</div>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="电话" name="phone">
          <Input placeholder="请输入电话联系方式" />
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="微信" name="weixin">
          <Input placeholder="请输入微信联系方式" />
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} extra="联系方式至少需要填写其中一项" className={styles.inputItem} label="QQ" name="QQ">
          <Input placeholder="请输入QQ联系方式" />
        </Form.Item>
      </Form.Item>
      <Form.Item className={styles.inputItem}>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="简介" name="summary">
          <Input.TextArea placeholder="请输入电话联系方式" />
        </Form.Item>
      </Form.Item>
    </Form>
    <div className={styles.buttonContent}>
      <Button className={styles.publishButton} onClick={confirmButton}>确认发布</Button>
    </div>
  </div>
}

export default StorePublish;
