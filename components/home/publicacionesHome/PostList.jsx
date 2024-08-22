"use client"
import PostCard from './PostCard';
import postsData from '@/test/posts.json';
import { useState, useEffect } from 'react';
import { Button } from "antd";
import { useRouter } from 'next/navigation';


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
  const router = useRouter();
  return (
    <div className="grid place-items-center py-12 ">
      <h1 className="text-3xl font-semibold">ULTIMAS PUBLICACIONES</h1>
      <PostList />
      <Button  onClick={() => router.push('/ListaActividades')} className="w-32" type="primary"><h1>VER MAS</h1></Button> 

    </div>
        

  );
};

export default PostList;

