import { get } from '@/utils/request';
import * as API from './api';

export async function getArticleList(params?: { id: string }) {
  const res = await get(API.LIST, params);
  return res;
}
