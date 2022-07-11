import React from 'react';
import Image from '@/components/Image';
import ABOUTME from '@/assets/images/about_me.jpg';
import Icons from '@/components/Icons';
import styles from './index.less';
import { comments } from '../../../mock';

interface IProps {}

console.log(comments, 'comments');

const Comments: React.FC<IProps> = () => {
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
                      name="icon-dianzan"
                      text={i.likeCount || '点赞'}
                      iconWrapClass={styles.iconWrap}
                    />
                    <Icons
                      name="icon-xiaoxi"
                      text={i.replyCount || '回复'}
                      iconWrapClass={styles.iconWrap}
                    />
                  </div>
                  {i.replyList && i.replyList.length > 0 && (
                    <div className={styles.commentChild}>
                      {i.replyList.slice(0, 2).map((j) => {
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
                                    <span className={styles.isAuthor}>
                                      (作者)
                                    </span>
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
                              <div className={styles.desc}>
                                {j.replyContent}
                              </div>
                              {j.formContent && (
                                <div className={styles.formContent}>
                                  {`“${j.formContent}”`}
                                </div>
                              )}
                              <div className={styles.action}>
                                <Icons
                                  name="icon-dianzan"
                                  text={j.likeCount || '点赞'}
                                  iconWrapClass={styles.iconWrap}
                                />
                                <Icons
                                  name="icon-xiaoxi"
                                  text={j.replyCount || '回复'}
                                  iconWrapClass={styles.iconWrap}
                                />
                              </div>
                              {i.replyList.length > 2 && (
                                <div className={styles.viewMore}>
                                  查看更多回复
                                  <Icons name="icon-youjiantou" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
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
