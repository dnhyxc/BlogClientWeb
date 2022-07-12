import React, { useState } from 'react';
import Image from '@/components/Image';
import ABOUTME from '@/assets/images/about_me.jpg';
import Icons from '@/components/Icons';
import styles from './index.less';
import { comments } from '../../../mock';

interface IProps {}

interface ReplyParams {
  commentId?: number;
  uid: number;
  avatarUrl: any;
  date: string;
  username: string;
  fromUid: number;
  fromUsername: string;
  formContent: string;
  replyContent: string;
  likeCount: number;
  replyCount: number;
  author: number;
}

const Comments: React.FC<IProps> = () => {
  const [viewMoreComments, setViewMoreComments] = useState<number[]>([]);

  // 收集可以查看全部的commentId
  const onViewMoreReply = (commentId: number) => {
    setViewMoreComments([...viewMoreComments, commentId]);
  };

  // 判断viewMoreComments是否包含commentId，以此返回对应的replyList
  const checkReplyList = (replyList: ReplyParams[], commentId: number) => {
    if (viewMoreComments.includes(commentId)) {
      return replyList;
    }
    return replyList.slice(0, 2);
  };

  return (
    <div className={styles.Comments}>
      {comments &&
        comments.length > 0 &&
        comments.map((i) => {
          return (
            <div className={styles.commentWrap} key={i.uid}>
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
                      {checkReplyList(i.replyList, i.commentId).map((j) => {
                        return (
                          <div className={styles.commentChildItem} key={j.uid}>
                            <div className={styles.avatar}>
                              <Image url={ABOUTME} className={styles.image} />
                            </div>
                            <div className={styles.commentChildItemContent}>
                              <div className={styles.userInfo}>
                                <span className={styles.name}>
                                  {j.username}
                                  {j.author !== 0 && (
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
                              <div className={styles.desc}>{j.replyContent}</div>
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
                      {checkReplyList(i.replyList, i.commentId).length !==
                        i.replyList.length && (
                        <div
                          className={styles.viewMore}
                          onClick={() => onViewMoreReply(i.commentId)}
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
