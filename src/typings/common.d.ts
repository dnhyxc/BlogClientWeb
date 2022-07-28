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
  authorId: string;
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
  authorId: string;
  coverImage: string;
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
  authorId: string;
}

/**
 * 第一层区别方式
 *  - id: 0，formContent: ''
 *
 * 第二层：
 *  - id: 第一层comment，formContent: ''
 *
 * 第三层：
 *  - id: 第二层comment，fromContent: 第二层回复内容
 */
export interface CommentParams {
  commentId?: string;
  articleId: string;
  userId: string;
  username: string;
  date: number;
  content?: string;
  fromUserId?: string;
  likeCount?: number;
  replyCount?: number;
  // replyContent?: string;
  fromUsername?: string;
  formContent?: string;
  replyList?: CommentParams[];
  fromCommentId?: string;
  isLike?: boolean;
}

export interface ReplayCommentResult {
  commentId: string;
}

export interface GiveLikeResult {
  status: number;
}

export interface DeleteCommentResult {
  status: number;
}
