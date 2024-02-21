// TableBody.tsx
import React from "react";

interface Props {
  columns: {
    field: string;
    render?: (data: any) => React.ReactNode;
    checkbox?: boolean; // Nueva prop para indicar si la columna es un checkbox
  }[];
  data: any[];
  selectedRows: any[]; // Cambiado a any[]
  toggleRow: (row: any) => void; // Cambiado a any
}

const TableBody: React.FC<Props> = ({
  columns,
  data,
  selectedRows,
  toggleRow,
}) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((column, colIndex) => (
            <td key={colIndex}>
              {column.checkbox ? (
                <>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)} // Comprobamos si la fila está seleccionada
                    onChange={() => toggleRow(row)} // Pasamos la fila completa al método toggleRow
                  />
                  {column.render
                    ? column.render(row[column.field])
                    : row[column.field]}
                </>
              ) : column.render ? (
                column.render(row[column.field])
              ) : (
                row[column.field]
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
