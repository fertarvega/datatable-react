// TableHeader.tsx
import React from "react";

interface Props {
  columns: {
    field: string;
    name: string;
    sortable: boolean;
    checkbox?: boolean;
  }[];
  toggleAllRows: (checked: boolean) => void;
  allRowsSelected: boolean;
  onColumnSort: (field: string) => void; // Nueva función para manejar el clic en el encabezado de la columna
  sortField: string | null; // Nuevo estado para el campo de clasificación actual
  sortOrder: "asc" | "desc" | "default"; // Nuevo estado para el orden de clasificación actual
}

const TableHeader: React.FC<Props> = ({
  columns,
  toggleAllRows,
  allRowsSelected,
  onColumnSort,
  sortField,
  sortOrder,
}) => {
  const handleToggleAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleAllRows(e.target.checked);
  };

  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>
            {column.checkbox ? (
              <>
                <input
                  type="checkbox"
                  checked={allRowsSelected}
                  onChange={handleToggleAllRows}
                />
                {column.name}
                {column.sortable && ( // Renderizamos el icono de ordenamiento si la columna es sortable
                  <button onClick={() => onColumnSort(column.field)}>
                    {sortField === column.field && sortOrder === "asc" && "↑"}
                    {sortField === column.field && sortOrder === "desc" && "↓"}
                    {sortField !== column.field && "↕"}
                  </button>
                )}
              </>
            ) : (
              <span>
                {column.name}
                {column.sortable && ( // Renderizamos el icono de ordenamiento si la columna es sortable
                  <button onClick={() => onColumnSort(column.field)}>
                    {sortField === column.field && sortOrder === "asc" && "↑"}
                    {sortField === column.field && sortOrder === "desc" && "↓"}
                    {sortField !== column.field && "↕"}
                  </button>
                )}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
