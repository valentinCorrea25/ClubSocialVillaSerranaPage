"use client"
import { Card, Button } from "antd";
import { CalendarOutlined, TagOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation';

const PostCard = ({ post }) => {
  const { Meta } = Card;
  const fechaEventoDate = post.fecha_evento;
  const fechaCorte = new Date("12/31/1969");

  // Lógica para mostrar "Noticias" o "Eventos"
  const categoriaLabel = fechaEventoDate > fechaCorte ? "Noticias" : "Eventos";
  const fechaevento = fechaEventoDate > fechaCorte ? '' : "Fecha del Evento: " + new Date(post.fecha_evento).toLocaleDateString();
  const router = useRouter();
  const handleViewDetails = (id) => {
    router.push(`/ListaEventosNoticias/DetalleEventosNoticias?id=${id}`);
  };
  const cleanContent = (htmlContent) => {
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;

    const brElements = temp.getElementsByTagName('br');
    while (brElements.length) {
      brElements[0].replaceWith(' ');
    }

    return temp.textContent || temp.innerText;
  }

  return (

    /*     <div className="bg-white p-6 rounded-sm shadow-lg max-w-[350px] ">
          <img src={post.fotos[0]} alt={post.titulo} className=" mx-auto py-3" />
          <h2 className="text-lg font-extrabold mb-2">{post.titulo}</h2>
          <p className="text-gray-700 text-sm text-justify"><CiCalendar className="inline " />  <span dangerouslySetInnerHTML={{ __html: post.contenido.substring(0, 140) }} />...
            <button className="text-[--verde] ml-2 hover:text-[--verder-super-oscuro]" >Ver mas</button>
          </p>
        </div > */
    <Card onClick={() => handleViewDetails(evento.id_EventoNoticia)}
      hoverable
      cover={
        <div
          className="m-auto"
          style={{
            overflow: "hidden",
            borderRadius: "12px",
            position: "relative",
          }}
        >
          <img
            alt={post.titulo}
            src={post.fotos[0]}
            style={{
              width: "100%",
              height: "250px",
              maxHeight: "250px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      }
      style={{
        width: "100%",
        margin: "0 auto",
        marginBottom: "24px",
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        padding: "12px",
      }}
    >
      <Meta
        title={
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              whiteSpace: "normal",
              wordWrap: "break-word",
              lineHeight: "1.4",
              marginBottom: "12px"
            }}
          >
            {post.titulo}
          </div>
        }
        description={
          <>
            <div style={{ color: "#0367A6" }}>
              <CalendarOutlined />{" "}
              {new Date(post.fecha_publicacion).toLocaleDateString()}
              <TagOutlined style={{ marginLeft: "8px" }} />{" "}
              {categoriaLabel}
              <div style={{ marginTop: "8px" }}>
                <span>{fechaevento}</span>
              </div>
            </div>
            <p
              style={{
                marginTop: "5px",
                height: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                lineHeight: "1.5"
              }}
            >
              {cleanContent(post.contenido).substring(0, 150)}
              {post.contenido.length > 150 && "..."}
            </p>
            <Button
              type="primary"
              onClick={() => handleViewDetails(evento.id_EventoNoticia)}
              className="mt-7 m-auto sm:ml-0"
            >
              Ver Detalles
            </Button>
          </>
        }
      />
    </Card>
  );
};

export default PostCard;
