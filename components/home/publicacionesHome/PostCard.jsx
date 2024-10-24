"use client"
import { CiCalendar } from "react-icons/ci";
const PostCard = ({ post }) => {

  return (

    <div className="bg-white p-6 rounded-sm shadow-lg max-w-[350px] ">
      <img src={post.foto} alt={post.titulo} className=" mx-auto py-3" />
      <h2 className="text-lg font-extrabold mb-2">{post.titulo}</h2>
      <p className="text-gray-700 text-sm text-justify"><CiCalendar className="inline " />  <span dangerouslySetInnerHTML={{ __html: post.contenido.substring(0, 140) }} />...
        <button className="text-[--verde] ml-2 hover:text-[--verder-super-oscuro]" >Ver mas</button>
      </p>

    </div >
  );
};

export default PostCard;
