import React, { useState } from 'react';
import { Skeleton, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import classname from 'classname';
import Icons from '@/components/Icons';
import { formatDate } from '@/utils';
import useStore from '@/store';
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
  articleEdit?: Function;
  deleteArticle?: Function;
  likeArticle?: Function;
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
  articleEdit,
  deleteArticle,
  likeArticle,
}) => {
  const {
    userInfoStore: { getUserInfo },
  } = useStore();

  const bgcStyle = (bgc: string) => {
    return {
      backgroundImage: `url(${bgc})`,
      backgroundPosition: 'center',
      backgroundSize: imgBgcSize,
      backgroundRepeat: 'no-repeat',
      transition: 'all 0.3s ease-in-out',
    };
  };

  // 文章点赞
  const onGiveLike = (item: ArticleListParams) => {
    likeArticle && likeArticle(item.id);
  };

  const content = (item: ArticleListParams) => {
    return (
      <>
        <div
          onClick={(e) => onEdit(e, item)}
          className={classname(styles.edit, styles.btn)}
        >
          编辑
        </div>
        <div onClick={(e) => onDelete(e, item)} className={styles.btn}>
          删除
        </div>
      </>
    );
  };

  const onEdit = (e: any, item: ArticleListParams) => {
    e.stopPropagation();
    articleEdit && articleEdit(item);
  };

  const onDelete = (e: any, item: ArticleListParams) => {
    e.stopPropagation();
    deleteArticle && deleteArticle(item.id);
  };

  return (
    <div className={classname(styles.wrap, wrapClass)}>
      {list && list.length > 0 ? (
        list.map((i) => (
          <div
            className={classname(styles.item, itemClass)}
            key={i.id}
            onClick={(e) => toDetail && toDetail(e, i.id)}
          >
            <div
              className={classname(styles.imgWrap, imgWrapClass)}
              style={i.coverImage ? bgcStyle(i.coverImage) : bgcStyle(IMAGE)}
            >
              <div className={styles.text}>{i.title}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{i.title}</div>
              <div className={descClass || styles.desc}>{i.abstract}</div>
              <div className={styles.date}>{formatDate(i.createTime)}</div>
              <div className={styles.action}>
                <div className={styles.icons}>
                  <Icons
                    name={`${i.isLike ? 'icon-24gf-thumbsUp2' : 'icon-24gl-thumbsUp2'}`}
                    text={i.likeCount! > 0 ? i.likeCount : '点赞'}
                    iconWrapClass={styles.iconWrap}
                    className={i.isLike ? styles.isLike : null}
                    onClick={() => onGiveLike(i)}
                  />
                  <Icons
                    name="icon-comment"
                    text="评论"
                    iconWrapClass={styles.iconWrap}
                    onClick={() => onGiveLike(i)}
                  />
                </div>
                {getUserInfo?.userId === i.authorId && (
                  <Popover
                    placement="left"
                    content={() => content(i)}
                    trigger="hover"
                    zIndex={12}
                  >
                    <EllipsisOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </Popover>
                )}
              </div>
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
