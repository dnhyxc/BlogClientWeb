import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import classname from 'classname';
import Image from '@/components/Image';
import ABOUTME from '@/assets/images/about_me.jpg';
import styles from './index.less';

const { TextArea } = Input;

interface IProps {}

const DraftInput: React.FC<IProps> = () => {
  const [showIcon, setShowIcon] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('click', onClickNode);
  }, []);

  const onClickNode = (e: any) => {
    if (!e.target.id) {
      setShowIcon(false);
    }
  };

  const onFocus = () => {
    setShowIcon(true);
  };

  return (
    <div className={styles.DraftInput} id="DRAFT_INPUT">
      <div id="COMMENTS" className={styles.comments}>
        评论
      </div>
      <div className={styles.content} id="CONTENT">
        <div className={styles.avatar} id="AVATAR">
          <Image url={ABOUTME} className={styles.image} id="IMAGE" />
        </div>
        <div className={styles.input} id="INPUT">
          <div className={styles.textAreaWrap} id="TEXTAREA_WRAP">
            <TextArea
              placeholder="请输入评论（Enter换行，Ctrl + Enter 发送）"
              autoSize={{ minRows: 3 }}
              className={styles.textArea}
              onFocus={onFocus}
              id="TEXTAREA_WRAP"
            />
          </div>
          {showIcon && (
            <div className={styles.emojiWrap} id="EMOJI_WRAP">
              <div id="ICONFONT" className={styles.iconfontWrap}>
                <span
                  className={classname(
                    styles.iconfont,
                    'iconfont icon-biaoqing-xue'
                  )}
                  id="BIAOQING_XUE"
                >
                  <span id="BIAOQING_XUE" className={styles.iconText}>
                    表情
                  </span>
                </span>
                <span
                  className={classname(
                    styles.iconfont,
                    'iconfont icon-charutupian'
                  )}
                  id="CHARUTUPIAN"
                >
                  <span id="CHARUTUPIAN" className={styles.iconText}>
                    图片
                  </span>
                </span>
              </div>
              <div id="ACTION">
                <span id="ENTER" className={styles.enter}>
                  Ctrl + Enter
                </span>
                <Button id="BTN" type="primary">
                  <span id="BTN">发表评论</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraftInput;
