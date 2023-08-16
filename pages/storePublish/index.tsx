import { NextPage } from "next";
import { Button, Form, Input, Select, message } from 'antd';
import styles from './index.module.scss';
import { fetchTagList } from "@/service/topicDetail";
import { useRouter } from "next/router";
import request from "@/service/fetch";

const { Option } = Select;

export async function getServerSideProps() {
  const resData = await fetchTagList();
  return {
    props: {
      tagList: resData.data
    }
  }
}

interface IProps {
  tagList: { name: string; id: number }[]
}

const StorePublish: NextPage<IProps> = (props) => {
  const { tagList } = props;
  const [formIns] = Form.useForm();
  const router = useRouter();

  const confirmButton = async () => {
    const formData = formIns.getFieldsValue();
    if (!formData.title) {
      message.error('请输入商家名称');
      return;
    }
    if (!formData.qq && !formData.wechat && !formData.telephone) {
      message.error('联系方式请至少选择一种录入');
      return;
    }
    const res: any = await request.post('/api/joinUs', { ...formData, type: 0 }, { withCredentials: true });
    if (res.code === 401) {
      router.push(`/login?redir=${router.pathname}`);
    } else if (res.code === -1) {
      message.error(res.msg);
    } else {
      router.push('/publishSuccess');
    }
  }
  return <div className={styles.pageContent}>
    <div className={styles.title}>店铺信息</div>
    <div className={styles.divider}></div>
    <Form initialValues={{ tagId: tagList[0].id }} colon={false} form={formIns} className={styles.storeForm}>
      <Form.Item className={styles.inputItem}>
        <div className={styles.secTitle}>基本信息</div>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="店铺名称" name="title">
          <Input placeholder="请输入店铺名称" />
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="所属区域" name="tagId">
          <Select>
            {tagList.map(tag => <Option key={tag.id} value={tag.id}>{tag.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="店铺地址" name="address">
          <Input placeholder="请输入店铺地址" />
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="营业时间" name="openingHour">
          <Input placeholder="请输入店铺营业时间" />
        </Form.Item>
      </Form.Item>
      <Form.Item className={styles.inputItem}>
        <div className={styles.secTitle}>联系方式</div>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="电话" name="telephone">
          <Input placeholder="请输入电话联系方式" />
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="微信" name="wechat">
          <Input placeholder="请输入微信联系方式" />
        </Form.Item>
        <Form.Item labelCol={{ span: 2 }} extra="联系方式至少需要填写其中一项" className={styles.inputItem} label="QQ" name="qq">
          <Input placeholder="请输入QQ联系方式" />
        </Form.Item>
      </Form.Item>
      <Form.Item className={styles.inputItem}>
        <Form.Item labelCol={{ span: 2 }} className={styles.inputItem} label="简介" name="description">
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
