import React from 'react';

import styles from './index.less';

interface IProps {}

const Comments: React.FC<IProps> = () => {
  return (
    <div className={styles.Comments}>
      <div>全部评论</div>
      <div>
        <div>头像</div>
        <div>
          <div>
            <div>名称</div>
            <div>评论内容</div>
            <div>点赞回复</div>
          </div>
          <div>
            <div>
              <div>名称</div>
              <div>评论内容</div>
              <div>点赞回复</div>
            </div>
            <div>
              <div>名称</div>
              <div>评论内容</div>
              <div>点赞回复</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
