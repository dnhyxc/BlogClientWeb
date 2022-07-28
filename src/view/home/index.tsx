/*
 * @Description: 首页
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\view\home\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, message, Modal } from 'antd';
import Content from '@/components/Content';
import Header from '@/components/Header';
import RightBar from '@/components/RightBar';
import Card from '@/components/Card';
import MAlert from '@/components/Alert';
import { useLoginStatus } from '@/hooks';
import useStore from '@/store';
import * as Service from '@/service';
import { normalizeResult } from '@/utils/tools';
import { ArticleListParams } from '@/typings/common';
import styles from './index.less';

const { Search } = Input;

interface IProps { }

const Home: React.FC<IProps> = () => {
  const [articleList, setArticleList] = useState<ArticleListParams[]>([]);

  const navigate = useNavigate();
  const { showAlert, toLogin, onCloseAlert, setAlertStatus, setResult } = useLoginStatus();
  const {
    userInfoStore: { getUserInfo },
  } = useStore();

  useEffect(() => {
    getArticleList();
  }, []);

  // 获取文章列表
  const getArticleList = async () => {
    const res = normalizeResult<ArticleListParams[]>(
      await Service.getArticleList({ pageNo: 1, pageSize: 20, userId: getUserInfo?.userId })
    );
    if (res.success) {
      setArticleList(res.data);
    }
  };

  const toDetail = (e: any, id: string) => {
    e.preventDefault();
    navigate(`/detail/${id}`);
  };

  // 删除文章
  const deleteArticle = (articleId: string) => {
    Modal.confirm(modalConfig(articleId));
  };

  const modalConfig = (articleId: string) => {
    return {
      title: '确定删除该评论吗？',
      async onOk() {
        const res = normalizeResult<{ id: string }>(
          await Service.deleteArticle({ articleId })
        );
        if (res.success) {
          getArticleList();
        } else {
          message.error(res.message);
        }
      },
    };
  };

  // 文章点赞
  const likeArticle = async (id: string) => {
    if (!getUserInfo) {
      setAlertStatus(true);
      return;
    }
    const res = normalizeResult<{ isLike: boolean }>(
      await Service.likeArticle({ id, userId: getUserInfo.userId })
    );

    setResult(res, getArticleList);
  };

  const onSearch = (value: string) => {
    console.log(value);
  };

  const rightNode = () => {
    return (
      <div>
        <Search placeholder="请输入搜索内容" enterButton onSearch={onSearch} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {showAlert && <MAlert onClick={toLogin} onClose={onCloseAlert} />}
      <Header needMenu needLeft={false} right={rightNode()}>
        文章列表
      </Header>
      <Content className={styles.contentWrap}>
        <div className={styles.content}>
          <Card
            list={articleList}
            toDetail={toDetail}
            deleteArticle={deleteArticle}
            likeArticle={likeArticle}
          />
          <RightBar className={styles.rightbar} />
        </div>
      </Content>
    </div>
  );
};

export default Home;
