"use client"
import { useRouter } from 'next/navigation';
import logo from "@/public/images/logo.png";
import Image from 'next/image';
import { Button } from 'antd';

export default function NotFound() {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center -mt-20">
            <div className="mb-4">

                <Image src={logo} alt="Not Found" width={200} height={200} />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Página no encontrada</h1>
            <Button type="primary" onClick={handleBackToHome}>
                Volver al inicio
            </Button>
        </div>
    );
}
