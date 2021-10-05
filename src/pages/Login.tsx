import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api/index';

interface LoginProps {
  setToken: (userToken: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();

  const login = async () => {
    const sendData = {
      username,
      password,
    }
    let res = await api.login.login(sendData);
    console.log(res);
    if (res.data.data['success'] === '登录成功') {
      setToken(res.data.data.token);
      history.replace('/');
    }

  }

  return (
    <div className='flex flex-col justify-center xl:space-y-4 items-center bg-white h-screen w-full relative px-5'>
      <p className='text-2xl absolute top-[120px] text-gray-500'>Ha0ran的博客后台新UI</p>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        className='border-b-2 outline-none caret-blue-400 md:my-1 px-4 py-2 md:w-1/2 xl:w-1/5  focus:border-blue-400'
        placeholder='请输入用户名'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        className='border-b-2 outline-none caret-blue-400 md:my-1 px-4 py-2 md:w-1/2 xl:w-1/5 focus:border-blue-400'
        placeholder='请输入密码'
      />
      <button
        className='w-4/5 sm:w-2/3 md:w-1/2 xl:w-1/5 rounded-lg py-2 md:my-4 shadow-md text-gray-400 active:scale-95 transform transition-transform duration-300 ease-out'
        onClick={login}
      >Go</button>
    </div>
  );
}

export default Login;