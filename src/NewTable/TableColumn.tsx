import React, { useContext } from "react";
import { TableContext } from "./Table";

const TableColumn = ({
  checkbox,
  sortable,
  field,
  sortField,
  children,
  typeSortField
}: {
  checkbox?: boolean;
  sortable?: boolean;
  field?: string;
  sortField?: string | null;
  typeSortField?: string;
  children: React.ReactNode;
}) => {
  const { onColumnSort, sortOrder, toggleAllRows, allRowsSelected } =
    useContext(TableContext);

  const handleToggleAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (toggleAllRows) {
      toggleAllRows(e.target.checked);
    }
  };

  const handleColumnSort = () => {
    if (onColumnSort && field) {
      onColumnSort(field, typeSortField, sortField);
    }
  };

  return (
    <th>
      {checkbox && (
        <>
          <input
            type="checkbox"
            checked={allRowsSelected}
            onChange={handleToggleAllRows}
          />
          {children}
        </>
      )}
      {!checkbox && <span>{children}</span>}
      {sortable && (
        <button onClick={handleColumnSort}>
          {sortField === field && sortOrder !== "default"
            ? sortOrder === "asc"
              ? "↑"
              : "↓"
            : "↕"}
        </button>
      )}
    </th>
  );
};

export default TableColumn;
