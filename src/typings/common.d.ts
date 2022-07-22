export interface LoginData {
  username: string;
  token: string;
  id: string;
  avatar?: string;
}

export interface UpdateData {
  id: string;
}

export interface CreateArticleParams {
  title: string;
  content: string;
  classify: string;
  tag: string;
  coverImage: string;
  abstract: string;
  createTime: number;
}

export interface CreateResult {
  id: number;
}

export interface GetArticleListParams {
  pageNo: number;
  pageSize: number;
  filter?: any;
}

export interface ArticleListParams {
  id: string;
  title: string;
  abstract: string;
  createTime: number;
}

export interface ArticleDetailParams {
  id: string;
  title: string;
  content: string;
  classify: string;
  tag: string;
  coverImage: string;
  abstract: string;
  createTime: number;
  comments: CommentParams[];
}

export interface CommentParams {
  articleId: string;
  userId: string;
  username: string;
  date: number;
  content?: string;
  fromUserId?: string;
  likeCount?: number;
  replyCount?: number;
  replyContent?: string;
  fromUsername?: string;
  formContent?: string;
  replyList?: CommentParams[];
}
