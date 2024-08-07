
import { CiCalendar } from "react-icons/ci";
const PostCard = ({ post }) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg ">
      <img src={post.image} alt={post.title} className=" mx-auto" />
      <h2 className="text-xl font-extrabold mb-2">{post.title}</h2>
      <p className="text-gray-700 text-justify">  <CiCalendar className="inline "/> {post.description.substring(0, 100)}...
        <button className="text-[--verde] ml-2 hover:text-[--verder-super-oscuro]" >Ver mas</button>
      </p>

    </div >
  );
};

export default PostCard;
