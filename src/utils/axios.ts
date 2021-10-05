import axios from 'axios';
import { createBrowserHistory } from 'history';
// const history = useHistory();
const history = createBrowserHistory();

const instance = axios.create({
  timeout: 10000,
});


const errorHandle = (status: number, other: string) => {
  switch (status) {
    case 401:
      console.error(other);
      break;
    case 403:
      console.error(other);
      localStorage.removeItem('token');
      history.push('/login');
      break;
    case 404:
      console.error(other);
      break;
    default:
      console.error(other);
      break;
  }
}


/**
 * http request 拦截器
 */

instance.interceptors.request.use(
  config => {
    const { url } = config;

    if (!url?.startsWith('/login') || !url?.startsWith('/register')) {
      const token = localStorage.getItem('token');
      token && (config.headers.Authorization = 'Bearer ' + token);
    }

    return config;
  },
  error => Promise.reject(error)
)

/**
 * http response 拦截器
 */

instance.interceptors.response.use(
  res =>
    res.status === 200
      ? Promise.resolve(res)
      : Promise.reject(res),
  error => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    }
  }

)

export default instance;