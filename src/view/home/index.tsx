/*
 * @Description: 首页
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\view\home\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import Content from '@/components/Content';
import Header from '@/components/Header';
import RightBar from '@/components/RightBar';
import Card from '@/components/Card';
import * as Server from '@/service';
import { normalizeResult } from '@/utils/tools';
import { ArticleListParams } from '@/typings/common';
import { list } from '../../../mock';
import styles from './index.less';

const { Search } = Input;

interface IProps {}

const Home: React.FC<IProps> = () => {
  const [articleList, setArticleList] = useState<ArticleListParams[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getArticleList();
  }, []);

  // 获取文章列表
  const getArticleList = async () => {
    const res = normalizeResult<ArticleListParams[]>(
      await Server.getArticleList({ pageNo: 1, pageSize: 20 })
    );
    if (res.success) {
      setArticleList(res.data);
    }
  };

  const toDetail = (id: string) => {
    navigate(`/detail/${id}`);
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
      <Header needMenu needLeft={false} right={rightNode()}>
        文章列表
      </Header>
      <Content className={styles.contentWrap}>
        <div className={styles.content}>
          <Card list={articleList} toDetail={toDetail} />
          <RightBar className={styles.rightbar} />
        </div>
      </Content>
    </div>
  );
};

export default Home;
