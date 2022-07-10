import React from 'react';
import Image from '@/components/Image';
import ABOUTME from '@/assets/images/about_me.jpg';
import Icons from '@/components/Icons';
import styles from './index.less';

interface IProps { }

const Comments: React.FC<IProps> = () => {
  return (
    <div className={styles.Comments}>
      <div className={styles.commentWrap}>
        <div className={styles.avatar}>
          <Image url={ABOUTME} className={styles.image} />
        </div>
        <div className={styles.commentContent}>
          <div className={styles.commentItem}>
            <div className={styles.userInfo}>
              <span className={styles.name}>dnhyxc</span>
              <span className={styles.date}>2022-07-09</span>
            </div>
            <div className={styles.desc}>通过一个 js 脚本创建一个 style 标签，里面包含一些样式。style-loader 是不能单独使用的，需要与 `css-loader` 一起使用。因为它并不负责解析 css 之前的依赖关系，每个 loader 的功能都是单一的，各自拆分独立。</div>
            <div className={styles.action}>
              <Icons name="icon-dianzan" text="点赞" />
              <Icons name="icon-xiaoxi" text="回复" />
            </div>
          </div>
          <div className={styles.commentChild}>
            <div className={styles.commentChildItem}>
              <div className={styles.avatar}>
                <Image url={ABOUTME} className={styles.image} />
              </div>
              <div>
                <div className={styles.userInfo}>
                  <span className={styles.name}>dnhyxc</span>
                  <span className={styles.date}>2022-07-09</span>
                </div>
                <div className={styles.desc}>通过一个 js 脚本创建一个 style 标签，里面包含一些样式。style-loader 是不能单独使用的，需要与 `css-loader` 一起使用。因为它并不负责解析 css 之前的依赖关系，每个 loader 的功能都是单一的，各自拆分独立。</div>
                <div className={styles.action}>
                  <Icons name="icon-dianzan" text="点赞" />
                  <Icons name="icon-xiaoxi" text="回复" />
                </div>
              </div>
            </div>
            <div className={styles.commentChildItem}>
              <div className={styles.avatar}>
                <Image url={ABOUTME} className={styles.image} />
              </div>
              <div>
                <div className={styles.userInfo}>
                  <span className={styles.name}>dnhyxc</span>
                  <span className={styles.date}>2022-07-09</span>
                </div>
                <div className={styles.desc}>通过一个 js 脚本创建一个 style 标签，里面包含一些样式。style-loader 是不能单独使用的，需要与 `css-loader` 一起使用。因为它并不负责解析 css 之前的依赖关系，每个 loader 的功能都是单一的，各自拆分独立。</div>
                <div className={styles.action}>
                  <Icons name="icon-dianzan" text="点赞" />
                  <Icons name="icon-xiaoxi" text="回复" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
