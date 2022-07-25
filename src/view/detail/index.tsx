/*
 * @Description: 详情页
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\view\detail\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Affix, BackTop, Spin, message, Alert, Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import Preview from '@/components/Preview';
import Header from '@/components/Header';
import Image from '@/components/Image';
import RightBar from '@/components/RightBar';
import Toc from '@/components/ArticleToc';
import DraftInput from '@/components/DraftInput';
import Comments from '@/components/Comments';
import * as Service from '@/service';
import useStore from '@/store';
import { normalizeResult } from '@/utils/tools';
import { ArticleDetailParams, CommentParams } from '@/typings/common';
import styles from './index.less';

const ArticleDetail: React.FC = () => {
  const [detail, setDetail] = useState<ArticleDetailParams>();
  const [comments, setComments] = useState<CommentParams[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    userInfoStore: { getUserInfo },
    commonStore,
  } = useStore();

  useEffect(() => {
    getArticleDetail();
    getCommentList();
  }, [id]);

  const getArticleDetail = async () => {
    const res = normalizeResult<ArticleDetailParams>(
      await Service.getArticleDetail({ id: id! })
    );
    if (res.success) {
      setDetail(res.data);
    } else {
      message.error(res.message);
    }
  };

  // 获取评论列表
  const getCommentList = async () => {
    const res = normalizeResult<CommentParams[]>(await Service.getCommentList({ id: id! }));
    if (res.success) {
      setComments(res.data);
    } else {
      message.error(res.message);
    }
  };

  const getAlertStatus = (status: boolean) => {
    setShowAlert(status);
  };

  const toLogin = () => {
    commonStore.setAuth({ redirectUrl: pathname });
    navigate('/login');
  };

  const renderCoverImg = (title: string, url: string, desc: string) => {
    return (
      <div className={styles.titleWrap}>
        <div className={styles.title}>{title}</div>
        {url && <Image url={url} className={styles.image} />}
        <p className={styles.desc}>{desc}</p>
      </div>
    );
  };

  return (
    <>
      <div className={styles.detailContainer}>
        {!getUserInfo?.userId && showAlert && (
          <Alert
            message={
              <div>
                您尚未登录，暂时无权操作，请前往
                <Button type="link" className={styles.toLogin} onClick={toLogin}>
                  登录
                </Button>
                后再试！
              </div>
            }
            type="warning"
            closable
            className={styles.alert}
          />
        )}
        <div className={styles.headerWrap}>
          <Header needLeft needMenu excludesWidth>
            <div className={styles.headerContent}>
              <div>DETAIL</div>
            </div>
          </Header>
        </div>
        <div className={styles.content}>
          <div className={styles.preview}>
            {detail ? (
              <Preview
                className={styles.previewContent}
                mackdown={detail.content}
                coverImg={renderCoverImg(detail.title, detail.coverImage, detail.abstract)}
              >
                <div className={styles.tagWrap}>
                  <div className={styles.tagList}>
                    <span className={styles.label}>分类：</span>
                    <div className={styles.tagItemWrap}>
                      <span className={styles.tag}>{detail.classify}</span>
                    </div>
                  </div>
                  <div className={styles.tagList}>
                    <span className={styles.label}>标签：</span>
                    <div className={styles.tagItemWrap}>
                      <span className={styles.tag}>{detail.tag}</span>
                    </div>
                  </div>
                </div>
              </Preview>
            ) : (
              <div className={styles.preview}>
                <Spin className={styles.spin} />
              </div>
            )}
            <div className={styles.draftInputWrap}>
              <DraftInput
                getCommentList={getCommentList}
                focus={false}
                getAlertStatus={getAlertStatus}
              />
            </div>
            {comments.length > 0 && detail && (
              <div className={styles.commentList}>
                <div className={styles.title}>全部评论</div>
                <Comments
                  comments={comments}
                  authorId={detail.authorId}
                  getCommentList={getCommentList}
                  getAlertStatus={getAlertStatus}
                />
              </div>
            )}
          </div>
          <div className={styles.rightBar}>
            <RightBar />
            {detail && (
              <Affix offsetTop={50}>
                <Toc mackdown={detail.content} />
              </Affix>
            )}
          </div>
        </div>
      </div>
      <BackTop className={styles.backTopWrap}>
        <div className={styles.backTop}>
          <ArrowUpOutlined className={styles.topIcon} />
        </div>
      </BackTop>
    </>
  );
};

export default ArticleDetail;
