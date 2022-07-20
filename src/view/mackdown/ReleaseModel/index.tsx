import React, { useState } from 'react';
import { Form, Drawer, Select, Upload, Modal, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Icons from '@/components/Icons';
import { FILETYPE } from '@/constant';

import styles from './index.less';

const { TextArea } = Input;

interface IProps {
  visible: boolean;
  onCancel: Function;
}

const ReleaseModel: React.FC<IProps> = ({ visible = true, onCancel }) => {
  const [filePath, setFilePath] = useState<string>(
    'http://localhost:9112/4e817cd59c0217adb283a294c.jpg'
  );
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  const onClose = () => {
    onCancel && onCancel();
  };

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    if (file.status === 'done') {
      const path = file.response.data.filePath;
      setFilePath(path);
      message.success(file.response.message);
    }
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

  return (
    <div className={styles.ReleaseModel}>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} layout="horizontal">
          <Form.Item label="分类">
            <div className={styles.tagList}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                return <span key={i} className={styles.tag}>{`分类${i}`}</span>;
              })}
            </div>
          </Form.Item>
          <Form.Item label="标签">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="封面" valuePropName="fileList">
            <Upload
              name="file"
              action="/api/upload"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
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
          </Form.Item>
          <Form.Item label="摘要">
            <TextArea rows={3} autoSize={{ minRows: 3, maxRows: 10 }} maxLength={220} />
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
