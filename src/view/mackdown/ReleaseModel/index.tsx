import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Drawer, Select, Upload, Modal, message, Input, Button, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import Icons from '@/components/Icons';
import useStore from '@/store';
import * as Server from '@/service';
import { normalizeResult } from '@/utils/tools';
import { FILETYPE, ARTICLE_CLASSIFY, ARTICLE_TAG } from '@/constant';
import { CreateArticleParams, CreateResult } from '@/typings/common';

import styles from './index.less';

const { TextArea } = Input;

interface IProps {
  visible: boolean;
  onCancel: Function;
}

const ReleaseModel: React.FC<IProps> = ({ visible = true, onCancel }) => {
  const [filePath, setFilePath] = useState<string>(
    'http://localhost:9112/8453fc0ad0741ef1814deee02.jpg'
  );
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {
    create,
    userInfoStore: { getUserInfo },
  } = useStore();

  const onClose = () => {
    onCancel && onCancel();
  };

  const beforeUpload = (file: RcFile) => {
    const fileType = file.type;
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!FILETYPE.includes(fileType)) {
      message.error('请上传 png、jpg、jpeg、gif 格式的图片');
    }
    if (!isLt20M) {
      message.error('请上传小于20M的图片');
    }
    return FILETYPE.includes(fileType) && isLt20M;
  };

  const onUploadFile: UploadProps['onChange'] = ({ file }) => {
    if (file.status === 'done') {
      const path = file.response.data.filePath;
      setFilePath(path);
      form.setFieldsValue({ coverImage: path });
      message.success(file.response.message);
    }
  };

  // 预览图片
  const onPreview = () => {
    setPreviewVisible(true);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  // 删除图片
  const onDeleteFile = () => {
    setFilePath('');
  };

  // 调用创建文章的接口
  const createArticle = async (params: CreateArticleParams) => {
    const res = normalizeResult<CreateResult>(await Server.createArticle(params));
    if (res.success) {
      message.success(res.message);
      navigate('/home');
    } else {
      res.message && message.error(res.message);
    }
  };

  // 提交表单
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      createArticle({
        ...values,
        content: create.mackdown,
        createTime: new Date().valueOf(),
        authorId: getUserInfo.userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.ReleaseModel}>
      <Drawer
        title="发布文章"
        placement="right"
        width={500}
        closable={false}
        onClose={onClose}
        visible={visible}
        extra={
          <Button type="primary" onClick={onFinish}>
            发布
          </Button>
        }
      >
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 22 }}
          layout="horizontal"
          form={form}
          name="form"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请先输入文章标题！' }]}
          >
            <Input placeholder="请输入文章标题！" maxLength={50} />
          </Form.Item>
          <Form.Item
            label="分类"
            name="classify"
            rules={[{ required: true, message: '请选择分类！' }]}
          >
            <Radio.Group buttonStyle="solid">
              {ARTICLE_CLASSIFY.map((i) => {
                return (
                  <Radio.Button className={styles.tag} key={i} value={i}>
                    {i}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="标签"
            name="tag"
            rules={[{ required: true, message: '请选择一个标签！' }]}
          >
            <Select placeholder="请选择标签">
              {ARTICLE_TAG.map((i) => (
                <Select.Option value={i} key={i}>
                  {i}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面" valuePropName="fileList" name="coverImage">
            <>
              <Upload
                name="file"
                action="/api/upload"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={onUploadFile}
                className={styles.upload}
              >
                {!filePath && <PlusOutlined />}
              </Upload>
              {filePath && (
                <div className={styles.uploadImgWrap}>
                  <div className={styles.mark}>
                    <Icons
                      name="icon-browse"
                      className={styles.iconWrap}
                      onClick={onPreview}
                    />
                    <Icons
                      name="icon-shanchu"
                      className={styles.iconWrap}
                      onClick={onDeleteFile}
                    />
                  </div>
                  <img className={styles.uploadImg} src={filePath} alt="" />
                </div>
              )}
            </>
          </Form.Item>
          <Form.Item
            label="摘要"
            name="abstract"
            rules={[{ required: true, message: '请先输入文章摘要！' }]}
          >
            <TextArea
              placeholder="请输入文章摘要"
              rows={3}
              autoSize={{ minRows: 3, maxRows: 10 }}
              maxLength={100}
              showCount
            />
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        visible={previewVisible}
        centered
        closable={false}
        width={600}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="" style={{ width: '100%' }} src={filePath} />
      </Modal>
    </div>
  );
};

export default ReleaseModel;
