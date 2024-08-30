'use client'
import PostCard from './PostCard';
import { useState, useEffect, useContext } from 'react';
import { Button, Spin } from "antd";
import { useRouter } from 'next/navigation';
import { ClientContext } from '@/context/clientContext';

function PostList() {
  const { ultimas3EventoNoticia } = useContext(ClientContext);
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      const data = await ultimas3EventoNoticia();
      setPublicaciones(data);  // Directly set the data returned from ultimas3EventoNoticia
    };
  
    fetchPublicaciones();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className='grid gap-3 px-10 py-10 md:grid md:grid-cols-3'>
      {publicaciones.length > 0 ? (
        publicaciones.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      ) : (
        <Spin size='large' />
      )}
    </div>
  );
};

export function ListaDeUltimasPublicaciones() {
  const router = useRouter();
  return (
    <div className="grid place-items-center py-12 px-5 max-w-screen-xl m-auto">
      <h1 className="text-3xl font-semibold">ÚLTIMAS PUBLICACIONES</h1>
      <PostList />
      <Button onClick={() => router.push('/ListaActividades')} className="w-32" type="primary">
        <h1>Ver más</h1>
      </Button> 
    </div>
  );
};

export default PostList;
