import Image from "next/image";
import Test from "@/components/home/Test";
import { DatePicker } from 'antd';

export default function Home() {
  return (
    <div className="flex justify-center items-center text-5xl p-20">
      <DatePicker />
    </div>
  );
}
 