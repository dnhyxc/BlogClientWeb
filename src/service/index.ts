import { register, login, updateInfo } from './user';
import {
  getArticleList,
  createArticle,
  getArticleDetail,
  releaseComment,
  getCommentList,
  giveLike,
  deleteComment,
  deleteArticle,
} from './article';

export const upload = (params: any) => {
  console.log(params, 'params');
  return 'https://dnhyxc.gitee.io/img/dnhyxc.jpg';
};

export {
  register,
  login,
  updateInfo,
  getArticleList,
  createArticle,
  getArticleDetail,
  releaseComment,
  getCommentList,
  giveLike,
  deleteComment,
  deleteArticle,
};
