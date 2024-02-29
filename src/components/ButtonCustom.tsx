import React from "react";
import "../css/ButtonCustom.css"; // Archivo CSS para estilos personalizados

const ButtonCustom = ({
  onClick,
  children,
  row,
  idx,
}: {
  onClick: () => void; // Función que se ejecutará al hacer clic en el botón
  children: React.ReactNode; // Contenido del botón
  row?: any; // Fila de la tabla
  idx?: number; // Índice de la fila})
}) => {
  return (
    <button className="button-custom" onClick={onClick}>
      {idx}
    </button>
  );
};

export default ButtonCustom;
