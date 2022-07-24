import React from 'react';
import { Skeleton } from 'antd';
import classname from 'classname';
import { formatDate } from '@/utils';
import IMAGE from '@/assets/images/about_me.jpg';
import { ArticleListParams } from '@/typings/common';
import styles from './index.less';

interface IProps {
  list: ArticleListParams[];
  toDetail?: Function;
  wrapClass?: string;
  itemClass?: string;
  imgWrapClass?: string;
  imgBgcSize?: string;
  descClass?: string;
  skeletonRows?: number;
  skeletonAvatar?: string;
}

const Card: React.FC<IProps> = ({
  list,
  toDetail,
  wrapClass,
  itemClass,
  imgWrapClass,
  imgBgcSize = '100% 150px',
  descClass,
  skeletonRows = 3,
  skeletonAvatar,
}) => {
  const bgcStyle = (bgc: string) => {
    return {
      backgroundImage: `url(${bgc})`,
      backgroundPosition: 'center',
      backgroundSize: imgBgcSize,
      backgroundRepeat: 'no-repeat',
      transition: 'all 0.3s ease-in-out',
      // filter: "blur(0.5px)",
    };
  };
  return (
    <div className={classname(styles.wrap, wrapClass)}>
      {list && list.length > 0 ? (
        list.map((i) => (
          <div
            className={classname(styles.item, itemClass)}
            key={i.id}
            onClick={() => toDetail && toDetail(i.id)}
          >
            <div
              className={classname(styles.imgWrap, imgWrapClass)}
              style={bgcStyle(IMAGE)}
            >
              <div className={styles.text}>{i.title}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{i.title}</div>
              <div className={descClass || styles.desc}>{i.abstract}</div>
              <div className={styles.date}>{formatDate(i.createTime)}</div>
            </div>
          </div>
        ))
      ) : (
        <div className={classname(styles.item, itemClass, styles.skeletonWrap)}>
          <Skeleton.Image className={classname(styles.skeletonAvatar, skeletonAvatar)} />
          <Skeleton active paragraph={{ rows: skeletonRows }} />
        </div>
      )}
    </div>
  );
};

export default Card;
