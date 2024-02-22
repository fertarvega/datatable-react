import React from "react";

interface Props {
  children?: React.ReactNode;
  field: string;
  row?: any;
  checkbox?: boolean;
  toggleRow?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRows?: any[];
}

const TableData: React.FC<Props> = ({
  row,
  checkbox,
  toggleRow,
  field,
  selectedRows,
}) => {
  return (
    <td>
      {checkbox && toggleRow && selectedRows && (
        <input
          type="checkbox"
          onChange={() => toggleRow(row)}
          checked={selectedRows.includes(row)}
        />
      )}
      {typeof row[field] !== "object" ? row[field] : "testing"}
    </td>
  );
};

export default TableData;
