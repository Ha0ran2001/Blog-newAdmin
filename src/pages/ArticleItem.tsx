import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import New from '@/pages/New';


const ArticleItem: React.FC = () => {

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    console.log(id);

  }, [])

  return (
    <New id={id} />
  )
}

export default ArticleItem;