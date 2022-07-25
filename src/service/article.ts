import { post } from '@/utils/request';
import * as API from './api';
import { CreateArticleParams, GetArticleListParams, CommentParams } from '@/typings/common';

export async function createArticle(params: CreateArticleParams) {
  const res = await post(API.CREATE_ARTICLE, params);
  return res;
}

export async function deleteArticle(params: { articleId: string }) {
  const res = await post(API.DELETE_ARTICLE, params);
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

/**
 * 第一层区别方式
 *  - id: 0，formContent: ''
 *
 * 第二层：
 *  - id: 第一层uid，formContent: ''
 *
 * 第三层：
 *  - id: 第二层uid，fromContent: 第二层回复内容
 */
export async function releaseComment(params: CommentParams) {
  const res = await post(API.COMMENTS, params);
  return res;
}

export async function getCommentList(params: { id: string }) {
  const res = await post(API.GET_COMMENT_LIST, params);
  return res;
}

export async function giveLike(params: { commentId: string; fromCommentId?: string }) {
  const res = await post(API.GIVE_LIKE, params);
  return res;
}

export async function deleteComment(params: { commentId: string; fromCommentId?: string }) {
  const res = await post(API.DELETE_COMMENT, params);
  return res;
}
