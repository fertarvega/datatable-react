// TableBody.tsx
import React from "react";

interface Props {
  columns: {
    field: string;
    render?: (data: any) => React.ReactNode;
    checkbox?: boolean;
  }[];
  data: any[];
  selectedRows: any[];
  toggleRow: (row: any) => void;
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
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRow(row)}
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
