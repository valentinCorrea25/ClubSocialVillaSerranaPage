"use client"
import PostCard from './PostCard';
import postsData from '@/test/posts.json';
import { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Obtener las últimas 3 publicaciones cuando el componente se monta
    setPosts(postsData.slice(-3));
  }, []);

  return (
    <div className=' grid gap-3 px-20 py-10 md:grid md:grid-cols-3  '>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
export function Mostrar() {
  return (
    <div className="grid place-items-center ">
      <h1 className="text-3xl font-semibold">ULTIMAS PUBLICACIONES</h1>
      <PostList />
    </div>

  );
};

export default PostList;

