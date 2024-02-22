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
  onColumnSort: (field: string) => void;
  sortField: string | null;
  sortOrder: "asc" | "desc" | "default";
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
                {column.sortable && (
                  <button onClick={() => onColumnSort(column.field)}>
                    {sortField === column.field && sortOrder !== "default"
                      ? sortOrder === "asc"
                        ? "↑"
                        : sortOrder === "desc"
                        ? "↓"
                        : ""
                      : "↕"}
                  </button>
                )}
              </>
            ) : (
              <span>
                {column.name}
                {column.sortable && (
                  <button onClick={() => onColumnSort(column.field)}>
                    {sortField === column.field && sortOrder !== "default"
                      ? sortOrder === "asc"
                        ? "↑"
                        : sortOrder === "desc"
                        ? "↓"
                        : ""
                      : "↕"}
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
