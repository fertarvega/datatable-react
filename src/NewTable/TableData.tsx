import React, { useContext } from "react";
import { TableContext } from "./Table";

const TableData = ({
  field,
  row,
  checkbox,
  children,
}: {
  field: string;
  row?: any;
  checkbox?: boolean;
  children?: React.ReactNode;
}) => {
  const { toggleRow, selectedRows } = useContext(TableContext);
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
