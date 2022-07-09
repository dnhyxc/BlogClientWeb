import React from 'react';
import { Input } from 'antd';
import styles from './index.less';

const { TextArea } = Input;

interface IProps {}

const DraftInput: React.FC<IProps> = () => {
  return (
    <div className={styles.DraftInput}>
      <div className={styles.textAreaWrap}>
        <TextArea
          placeholder="请输入评论（Enter换行，Ctrl + Enter 发送）"
          autoSize={{ minRows: 3 }}
          className={styles.textArea}
        />
      </div>
      <div className={styles.emojiWrap}>
        <span className="iconfont icon-biaoqing-xue">表情</span>
        <span>图片</span>
      </div>
    </div>
  );
};

export default DraftInput;
