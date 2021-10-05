/**
 * api 接口的统一出口
 */

// 文章模块接口（虽然只有这一个）
import article from './article';
import login from './login';

export default {
  article,
  login
}