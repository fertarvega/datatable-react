import React, { useContext } from "react";
import { TableContext } from "./Table";

const TableData = ({
  field,
  type,
  row,
  idx,
  checkbox,
  children,
}: {
  field: string;
  type: string;
  row?: any;
  idx?: number;
  checkbox?: boolean;
  children?: React.ReactNode;
}) => {
  const customChildren = (children: React.ReactNode) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          row,
          field,
          idx,
        } as React.Attributes);
      }
      return null;
    });
  };
  const { toggleRow, selectedRows } = useContext(TableContext);
  const dictComponents: any = {
    default: row[field],
    custom: customChildren(children),
    anchore: <a href={row[field].url}>{row[field].name}</a>,
  };

  return (
    <td>
      {checkbox && toggleRow && selectedRows && (
        <input
          type="checkbox"
          onChange={() => toggleRow(row)}
          checked={selectedRows.includes(row)}
        />
      )}
      {dictComponents[type]}
    </td>
  );
};

export default TableData;
