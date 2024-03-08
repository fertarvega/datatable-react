import React from "react";
import "../css/ButtonCustom.css"; // Archivo CSS para estilos personalizados

const ButtonCustom = ({
  children,
  row,
  idx,
}: {
  children: React.ReactNode; // Contenido del botón
  row?: any; // Fila de la tabla
  idx?: number; // Índice de la fila})
}) => {
  return (
    <button className="button-custom" onClick={() => alert(row.details.url)}>
      <p style={{margin: '0'}}>{row.details.name}</p>
      <p style={{margin: '0'}}>{row.details.url}</p>
    </button>
  );
};

export default ButtonCustom;
