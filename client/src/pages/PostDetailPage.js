import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import BorderLayout from '../components/BorderLayout';
import PostCard from '../components/PostCard';

const PostDetailPage = () => {
  const params = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [modifiedAt, setModifiedAt] = useState([])
  const [comments, setComments] = useState([])
  const [writer, setWriter] = useState('')
  const [postId, setPostId] = useState('')
  const [likeCount, setLikeCount] = useState(0)
  useEffect(()=>{
    axios.get(`/posts/${params.id}`)
    .then((res)=>{
      console.log(res.data)
      setTitle(res.data.title)
      setCategory(res.data.category)
      setCreatedAt(res.data.createdAt)
      setContent(res.data.content)
      setComments(res.data.comments)
      setWriter(res.data.nickname)
      setPostId(res.data.postId)
      setLikeCount(res.data.likeCount)
    })
  },[])
  return (
    <BorderLayout>
      <PostCard title={title} content={content} category={category} createdAt={createdAt} likeCount={likeCount} postId={postId} writer={writer} comments={comments}/>
    </BorderLayout>
  );
};


export default PostDetailPage;
