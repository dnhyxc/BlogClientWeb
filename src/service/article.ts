import { post } from '@/utils/request';
import * as API from './api';
import { CreateArticleParams, GetArticleListParams } from '@/typings/common';

export async function createArticle(params: CreateArticleParams) {
  const res = await post(API.CREATE_ARTICLE, params);
  return res;
}
export async function getArticleList(params: GetArticleListParams) {
  const res = await post(API.ARTICLE_LIST, params);
  return res;
}

export async function getArticleDetail(params: { id: string }) {
  const res = await post(API.ARTICLE_DETAIL, params);
  return res;
}
