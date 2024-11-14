"use client"
import { useRouter } from 'next/navigation';
import logo from "@/public/images/logo.png";
import Image from 'next/image';
import { Button } from 'antd'

export default function NotFoundPage() {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="mb-8">
                <Image src={logo} alt="Not Found" width={200} height={200} />
            </div>
            <h1 className="text-4xl font-bold mb-4">Error 404 - Página no encontrada</h1>
            <p className="text-lg mb-8">La página que estás buscando no existe o ha sido movida.</p>
            <Button variant="primary" onClick={handleBackToHome}>
                Volver al inicio
            </Button>
        </div>
    );
}