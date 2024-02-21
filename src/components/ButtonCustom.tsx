import React from "react";
import "../css/ButtonCustom.css"; // Archivo CSS para estilos personalizados

interface ButtonCustomProps {
  onClick: () => void; // Función que se ejecutará al hacer clic en el botón
  children: React.ReactNode; // Contenido del botón
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ onClick, children }) => {
  return (
    <button className="button-custom" onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonCustom;
