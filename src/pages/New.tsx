import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowSmLeftIcon } from '@heroicons/react/solid';
// import { Calendar } from 'react-date-range';
// import { DateRangePicker } from 'react-date-range';
import fetch from '@/api/article';
import fetchTypes from '@/api/types';
import marked from 'marked';

export interface NewProps {
  id?: string;
}

interface Types {
  id: string;
  typeName: string;
}

const New: React.FC<NewProps> = ({ id }) => {
  // marked参数设置
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const [title, setTitle] = useState<string>('');
  // const [introduce, setIntroduce] = useState<string>();
  const [types, setTypes] = useState<Types[]>();
  const [typeId, setTypeId] = useState<string>('');
  // const [createTime, setCreateTime] = useState<string>();
  const [content, setContent] = useState<string>('');

  const getTypes = async () => {
    const res = await fetchTypes.getTypes();
    console.log(res.data.data);
    const types = res.data.data;
    setTypes(types);
  }

  const getArticleById = async (id: string) => {
    const res = await fetch.modifyArticle(parseInt(id));
    console.log(res);
    const data = res.data.data;
    // console.log(data.id);
    setTitle(data.title);
    setContent(data.content);
    setTypeId(data.typeId)
  }

  useEffect(() => {
    getTypes();
    if (id) {
      getArticleById(id);
    }
  }, [id]);

  const history = useHistory();

  const addArticle = async () => {
    const data = {
      title,
      typeId,
      createTime: Date.now().toString().slice(0, 10),
      content
    };
    console.log(data);


    const res = await fetch.addArticle(data);
    console.log(res);

  }

  return (
    <div className='h-full'>
      <div
        className='flex items-center justify-between text-black'
      >
        <div
          onClick={() => history.goBack()}
          className='flex items-center text-purple-700 text-2xl cursor-pointer'>
          <ArrowSmLeftIcon className='h-7 w-7' />
          <span>Back</span>
        </div>
        <select
          onChange={(e) => setTypeId(e.target.value)}
          className='outline-none dark:bg-gray-700 dark:text-white'
          value={typeId}
        >
          {types && types.map(item => (
            <option value={item.id} key={item.id} className='text-black'>{item.typeName}</option>
          ))}
        </select>
      </div>
      <div className=''>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder='Title here...'
          className='outline-none bg-transparent text-xl text-black font-bold caret-blue-400 dark:caret-white dark:text-white my-5'
        />
        {id ?
          <div
            dangerouslySetInnerHTML={{ __html: marked(content) }}
            className='h-[500px] w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 outline-none p-5 caret-black overflow-y-scroll'
          />
          : <textarea
            onChange={(e) => setContent(e.target.value)}
            className='h-[300px] w-full bg-gray-200 dark:bg-gray-700 text-black outline-none p-5 caret-black'>
          </textarea>
        }
      </div>
      <div className='flex justify-between'>
        <button
          onClick={addArticle}
          className='px-4 py-2 text-white bg-purple-700 rounded-md active:ring-2 ring-purple-400 my-4'
        >
          Submit
        </button>
        {id
          &&
          <button
            onClick={async () => {
              const res = await fetch.deleteArticle(parseInt(id));
              history.push('/');
              window.location.reload();
            }}
            className='text-white px-4  bg-gray-300 dark:bg-gray-600 rounded-md my-4'
          >
            删除
          </button>}
      </div>
    </div>

  );
}

export default New;