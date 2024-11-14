import { Button, Input } from "antd";
// import { Textarea } from "@/components/ui/textarea"
import {
  FacebookOutlined,
  InstagramOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Foto from "@/public/images/loginScreen.jpg";

export default function ContactoInfo({record}) {
  return (
    <div className="min-h-screen bg-[--blanco]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Contacto - Club Social y Deportivo Villa Serrana
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Información de Contacto
            </h2>
            <div className="space-y-4 text-xl">
              <a
                href="https://www.instagram.com/villaserrana"
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
              >
                <InstagramOutlined className="h-5 w-5" />
                <span>@villaserrana</span>
              </a>
              <a
                href="tel:+59812345678"
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
              >
                <PhoneOutlined className="h-5 w-5" />
                <span>+598 1234 5678</span>
              </a>
              <a
                href="https://www.facebook.com/villaserrana"
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
              >
                <FacebookOutlined className="h-5 w-5" />
                <span>Villa Serrana Oficial</span>
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Envíanos un mensaje
            </h2>
            <form className="space-y-4">
              <Input type="text" placeholder="Nombre" />
              <Input type="email" placeholder="Correo electrónico" />
              <textarea
                placeholder="Tu mensaje"
                className="max-h-16 w-full bg-[#f6ffed] border p-2"
              />
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Enviar mensaje
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8">
          <img
            src="https://www.dronestagr.am/wp-content/uploads/2017/08/DJI_0029-4-scaled.jpg"
            alt="Villa Serrana"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
