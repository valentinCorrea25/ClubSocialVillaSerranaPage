import React, { useContext, useEffect, useState } from "react";
import { Image, Modal, Upload } from "antd";
import { Button } from "antd";
import { AdminContext } from "@/context/adminContext";
import { getBase64 } from "@/components/utils/ControlPublicaciones";

import {
  PlusOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { FaTrash } from "react-icons/fa6";

export default function ImagenControl({
  selectedItem,
  fileList,
  setFileList,
  restoreVariables,
  onReset
}) {
  const { eliminarImagenesSupabase } = useContext(AdminContext);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [isModalOpenEliminarImagen, setIsModalOpenEliminarImagen] =
    useState(false);
  const [imageToDelete, setImageToDelete] = useState();
  const [previewImageSaved, setPreviewImageSave] = useState(true);

  const toolbarRenderInfo = {
    // Cambiar esto de archivo
    icons: {
      flipYIcon: <Button>Flip Y</Button>,
      flipXIcon: <Button>Flip X</Button>,
      rotateLeftIcon: <RotateLeftOutlined />,
      rotateRightIcon: <RotateRightOutlined />,
      zoomOutIcon: <ZoomOutOutlined />,
      zoomInIcon: <ZoomInOutlined />,
      trashIcon: <FaTrash />,
    },
    actions: {
      onFlipY: () => console.log("Flip Y"),
      onFlipX: () => console.log("Flip X"),
      onRotateLeft: () => console.log("Rotate Left"),
      onRotateRight: () => console.log("Rotate Right"),
      onZoomOut: () => console.log("Zoom Out"),
      onZoomIn: () => console.log("Zoom In"),
      onReset: () => console.log("Reset"),
      onClose: () => console.log("Close"),
    },
    transform: {
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    },
    current: 0,
    image: {
      src: "image-url",
      alt: "Image description",
    },
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleDeleteImage = (imageSrc) => {
    setImageToDelete(imageSrc);
    setPreviewImageSave(false); 
    setIsModalOpenEliminarImagen(true);
  };

  const confirmDeleteImage = () => {
    if (imageToDelete) {
      selectedItem.fotos = selectedItem.fotos.filter(
        (file) => file !== imageToDelete
      );
      eliminarImagenesSupabase(imageToDelete);
      setImageToDelete(null);
    }
    setIsModalOpenEliminarImagen(false);
  };

  const resetImageControlStates = () => {    
    setPreviewImage(null);
    setImageToDelete(null);
    setFileList([]);
  };

  useEffect(() => {
    if (restoreVariables) {
      resetImageControlStates();
      onReset();
    }
  }, [restoreVariables, onReset]);

  return (
    <>
      <div label="Subir imagenes">
        <div className="flex flex-col">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList && fileList.length >= 8 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
          <div>
            <h1 className="my-5">Imagenes ya subidas</h1>
            <div className="flex flex-wrap gap-1">
              {selectedItem.fotos &&
                selectedItem.fotos.map((item) => {

                  return (
                    <Image
                      className="max-w-28 max-h-20"
                      
                      preview={
                        previewImageSaved
                          ? {
                              toolbarRender: (_, actions) => (
                                <Button
                                  icon={toolbarRenderInfo.icons.trashIcon}
                                  onClick={() => {
                                    setIsModalOpenEliminarImagen(true);
                                    handleDeleteImage(item);
                                  }}
                                />
                              ),
                            }
                          : false
                      }
                      key={item}
                      src={`${item}`}
                      alt={selectedItem.titulo}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Confirmar eliminación"
        open={isModalOpenEliminarImagen}
        onCancel={() => setIsModalOpenEliminarImagen(false)}
        onOk={confirmDeleteImage}
        afterClose={() => setPreviewImageSave(true)}
      >
        <p>¿Está seguro de que desea eliminar esta imagen?</p>
      </Modal>
    </>
  );
}
