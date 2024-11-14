import { Button, Modal } from 'antd'
import React from 'react'
import { formatearTelefonoAUruguayo } from '../utils/ControlPublicaciones'
import ServicioContent from './ServicioContent'
import { FaWhatsapp } from 'react-icons/fa'

export default function ModalServicio({isOpen, handleCancel, servicio}) {
  return (
    <Modal
        open={isOpen}
        onCancel={handleCancel}
        footer={
          <div className="flex justify-center gap-8 items-center">
            <a href={`tel:${formatearTelefonoAUruguayo(servicio.celular)}`} className="flex justify-center">
              <Button size="large" className="bg-[--verde] text-white">Llamar</Button>
            </a>
            <a href={`https://wa.me/${formatearTelefonoAUruguayo(servicio.celular)}`} className="flex justify-center" target="_blank" rel="noopener noreferrer">
              <Button size="large" className="bg-[--verde] text-white">WhatsApp <FaWhatsapp/></Button>
            </a>
          </div>
        }
        
        width={600}
        bodyStyle={{ fontSize: "20px", padding: "24px" }}
      >
        <ServicioContent servicio={servicio} />
      </Modal>
  )
}
