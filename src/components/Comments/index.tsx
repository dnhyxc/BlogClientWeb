import React, { useState } from 'react';
import Image from '@/components/Image';
import useStore from '@/store';
import ABOUTME from '@/assets/images/about_me.jpg';
import Icons from '@/components/Icons';
import * as Service from '@/service';
import { normalizeResult } from '@/utils/tools';
import { CommentParams } from '@/typings/common';
import styles from './index.less';
// import { comments } from '../../../mock';

interface IProps {
  comments: CommentParams[];
}

const Comments: React.FC<IProps> = ({ comments }) => {
  const [viewMoreComments, setViewMoreComments] = useState<string[]>([]);

  const {
    userInfoStore: { getUserInfo },
  } = useStore();

  // 获取评论列表

  // 收集可以查看全部的commentId
  const onViewMoreReply = (commentId: string) => {
    setViewMoreComments([...viewMoreComments, commentId]);
  };

  // 判断viewMoreComments是否包含commentId，以此返回对应的replyList
  const checkReplyList = (replyList: CommentParams[], commentId: string) => {
    if (viewMoreComments.includes(commentId)) {
      return replyList;
    }
    return replyList.slice(0, 2);
  };

  console.log(comments, 'comments');

  return (
    <div className={styles.Comments}>
      {comments &&
        comments.length > 0 &&
        comments.map((i) => {
          return (
            <div className={styles.commentWrap} key={i.articleId}>
              <div className={styles.avatar}>
                <Image url={ABOUTME} className={styles.image} />
              </div>
              <div className={styles.commentContent}>
                <div className={styles.commentItem}>
                  <div className={styles.userInfo}>
                    <span className={styles.name}>{i.username}</span>
                    <span className={styles.date}>{i.date}</span>
                  </div>
                  <div className={styles.desc}>{i.content}</div>
                  <div className={styles.action}>
                    <Icons
                      name="icon-good"
                      text={i.likeCount || '点赞'}
                      iconWrapClass={styles.iconWrap}
                    />
                    <Icons
                      name="icon-comment"
                      text={i.replyCount || '回复'}
                      iconWrapClass={styles.iconWrap}
                    />
                  </div>
                  {i.replyList && i.replyList.length > 0 && (
                    <div className={styles.commentChild}>
                      {checkReplyList(i.replyList, i.articleId).map((j) => {
                        return (
                          <div className={styles.commentChildItem} key={j.userId}>
                            <div className={styles.avatar}>
                              <Image url={ABOUTME} className={styles.image} />
                            </div>
                            <div className={styles.commentChildItemContent}>
                              <div className={styles.userInfo}>
                                <span className={styles.name}>
                                  {j.username}
                                  {j.userId !== getUserInfo.userId && (
                                    <span className={styles.isAuthor}>(作者)</span>
                                  )}
                                  {j.fromUsername && (
                                    <span className={styles.replyInfo}>
                                      回复
                                      <span className={styles.fromUsername}>
                                        {j.fromUsername}
                                      </span>
                                    </span>
                                  )}
                                </span>
                                <span className={styles.date}>{j.date}</span>
                              </div>
                              {j.replyContent && (
                                <div className={styles.desc}>{j.replyContent}</div>
                              )}
                              {j.formContent && (
                                <div className={styles.formContent}>
                                  {`“${j.formContent}”`}
                                </div>
                              )}
                              <div className={styles.action}>
                                <Icons
                                  name="icon-good"
                                  text={j.likeCount || '点赞'}
                                  iconWrapClass={styles.iconWrap}
                                />
                                <Icons
                                  name="icon-comment"
                                  text={j.replyCount || '回复'}
                                  iconWrapClass={styles.iconWrap}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {checkReplyList(i.replyList, i.articleId).length !==
                        i.replyList.length && (
                        <div
                          className={styles.viewMore}
                          onClick={() => onViewMoreReply(i.articleId)}
                        >
                          <span className={styles.viewText}>查看更多回复</span>
                          <Icons name="icon-xiajiantou" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Comments;
