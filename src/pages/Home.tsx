import React, { useState, useEffect } from 'react';
import { useHistory, Route, useParams } from 'react-router-dom';
import '../style/home.css';
import fetch from '@/api/article';
// import marked from 'marked';

import New from './New';
import ArticleItem from './ArticleItem';

interface HomeProps {

}

interface BlogList {
  id: string;
  title: string;
  createTime: string;
  typeName: string;
  introduce: string;
  content: string;
}

const Home: React.FC<HomeProps> = () => {

  const history = useHistory();
  // const {id} = useParams();

  const [blogList, setBlogList] = useState<BlogList[]>();

  const getBlogData = async () => {
    const res = await fetch.getArticleList();
    const data = res.data.data;
    setBlogList(data);
    console.log(res);
  }

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <div className='dark:bg-gray-900 text-white md:h-homeHeight h-auto box-border relative'>
      <main className='w-full border-2 border-purple-400 dark:border-blue-900 rounded-md relative md:h-[500px] flex flex-col md:flex-row'>
        <div className='flex md:flex-col overflow-x-scroll overflow-y-hidden  md:w-[400px] md:overflow-y-scroll md:overflow-x-hidden'>
          <div className='w-[100px] md:w-full md:h-[60px] h-36 inline-block whitespace-nowrap align-middle p-5'>
            <div className='w-full h-full cursor-pointer text-yellow-300' onClick={() => history.push('/new')}>添加</div>
          </div>
          {blogList && blogList.map(item => (
            <div
              onClick={() => history.push(`/article/${item.id}`)}
              key={item.id}
              className='w-full whitespace-nowrap align-middle md:border-t-[1px] border-r-[1px] text-gray-400 border-gray-200 dark:border-gray-800 flex flex-col justify-between p-2'
            >
              <header className='w-full flex justify-between flex-col md:flex-row'>
                <p className='text-blue-500 dark:text-purple-600 font-bold'>{item.title.slice(0, 10)}</p>
                <span className='text-[14px]'>{item.createTime}</span>
              </header>
              <section
                className='w-full whitespace-normal'>
                {item.content.slice(0, 10)}
              </section>
              <footer className='text-[14px]'>{item.typeName}</footer>
            </div>
          ))}
        </div>
        {/* add new article */}
        <div className='w-full h-full dark:bg-gray-800 overflow-y-scroll p-5'>
          <div className='h-full'>
            <Route path='/new'><New /></Route>
            <Route path='/article/:id'><ArticleItem /></Route>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;