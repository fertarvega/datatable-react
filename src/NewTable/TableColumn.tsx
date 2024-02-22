import React from "react";

const TableColumn = ({
  checkbox,
  sortable,
  field,
  sortField,
  sortOrder,
  onColumnSort,
  children,
  toggleAllRows,
  allRowsSelected,
}: {
  checkbox?: boolean;
  sortable?: boolean;
  field?: string;
  sortField?: string | null;
  sortOrder?: "asc" | "desc" | "default";
  children: React.ReactNode;
  onColumnSort?: (field: string) => void;
  toggleAllRows?: (checked: boolean) => void;
  allRowsSelected?: boolean;
}) => {
  const handleToggleAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (toggleAllRows) {
      toggleAllRows(e.target.checked);
    }
  };

  const handleColumnSort = () => {
    if (onColumnSort && field) {
      onColumnSort(field);
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
