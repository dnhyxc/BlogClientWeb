/*
 * @Description: 详情页
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\view\detail\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Affix, BackTop, Spin, message } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import Preview from '@/components/Preview';
import Header from '@/components/Header';
import Image from '@/components/Image';
import RightBar from '@/components/RightBar';
import Toc from '@/components/ArticleToc';
import DraftInput from '@/components/DraftInput';
import Comments from '@/components/Comments';
import * as Server from '@/service';
import { normalizeResult } from '@/utils/tools';
import { ArticleDetailParams } from '@/typings/common';
import styles from './index.less';

interface DetailParams {
  name: string;
  desc: string;
  mackdown: any;
  date: string;
  img: string;
}

const ArticleDetail: React.FC = () => {
  const [detail, setDetail] = useState<ArticleDetailParams>();

  const { id } = useParams();

  console.log(id, 'id');

  useEffect(() => {
    getArticleDetail();
  }, [id]);

  const getArticleDetail = async () => {
    const res = normalizeResult<ArticleDetailParams>(
      await Server.getArticleDetail({ id: id! })
    );
    console.log(res);
    if (res.success) {
      setDetail(res.data);
    } else {
      message.error(res.message);
    }
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
              <DraftInput />
            </div>
            {detail && (
              <div className={styles.commentList}>
                <div className={styles.title}>全部评论</div>
                <Comments comments={detail.comments} />
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
