import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { SunIcon } from '@heroicons/react/outline';
import { MoonIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import useDarkMode from '@/utils/useDarkMode';

const Header: React.FC = () => {

  const [theme, setTheme] = useDarkMode();

  return (
    <header className='flex justify-between py-5 px-5 dark:text-white'>
      <Link to='/home'><p className='text-2xl font-bold hover:text-yellow-300 cursor-pointer'>Ha0ran的博客后台</p></Link>
      <div className='flex flex-col items-center space-y-4 md:flex-row md:space-y-0 space-x-2 '>
        <div className='cursor-pointer' onClick={() => {
          localStorage.removeItem('token');
          window.location.reload();
        }}>
          退出登录
        </div>
        <div className='rounded-full h-7 flex items-center space-x-1 p-1 dark:bg-gray-800 bg-gray-200'>
          <div className='px-2 rounded-full h-5 cursor-pointer bg-gray-300 dark:bg-transparent'>
            <SunIcon className='w-5 h-5 text-gray-500 dark:text-gray-200' onClick={() => setTheme('light')} />
          </div>
          <div className='px-2 rounded-full h-5 cursor-pointer dark:bg-gray-700'>
            <MoonIcon className='w-5 h-5 text-gray-800 dark:text-gray-300' onClick={() => setTheme('dark')} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;