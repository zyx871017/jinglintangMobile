import { Drawer, Form, Input, Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import ImgCrop from 'antd-img-crop';

interface IProps {
  isEdit: boolean;
}

const EditTopicDrawer = (props: IProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as any);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const fieldsChange = (value: any) => {
  }

  return <Drawer
    title="添加商户"
    open={isOpen}
  >
    <Form colon={false} onFieldsChange={fieldsChange}>
      <Form.Item label="商户名称" name="title">
        <Input placeholder="请输入商户名称" />
      </Form.Item>
      <Form.Item label="地址" name="address">
        <Input placeholder="请输入商户地址" />
      </Form.Item>
      <Form.Item label="电话" name="phone">
        <Input placeholder="请输入商户电话" />
      </Form.Item>
      <Form.Item label="微信" name="weixin">
        <Input placeholder="请输入商户微信" />
      </Form.Item>
      <Form.Item label="QQ" name="qq">
        <Input placeholder="请输入商户QQ" />
      </Form.Item>
      <Form.Item label="营业时间" name="time">
        <Input placeholder="请输入商户营业时间" />
      </Form.Item>
      <Form.Item label="商户简介" name="summary">
        <Input.TextArea placeholder="请输入商户简介" />
      </Form.Item>
      <Form.Item label="商户封面" name="cover">
        <Upload
          action="/api/image/upload"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </Form.Item>
    </Form>
  </Drawer>
}

export default EditTopicDrawer;