import { register, login, updateInfo } from './user';
import { getArticleList } from './article';

export const upload = (params: any) => {
  console.log(params, 'params');
  return 'https://dnhyxc.gitee.io/img/dnhyxc.jpg';
};

export { register, login, updateInfo, getArticleList };
