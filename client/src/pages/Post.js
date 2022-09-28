import { useState } from 'react';
import BorderLayout from '../components/BorderLayout';
import PostCard from '../components/PostCard';

const Post = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [createdAt, setCreatedAt] = useState([])
  const [modifiedAt, setModifiedAt] = useState([])
  const [comments, setComments] = useState([])
  return (
    <BorderLayout>
      <PostCard/>
    </BorderLayout>
  );
};


export default Post;
