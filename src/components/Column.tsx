// Column.tsx
import React from "react";

interface Props {
  field: string;
  header: string;
  sortable: boolean;
  onColumnSort: (field: string) => void;
  sortField: string | null;
  sortOrder: "asc" | "desc" | null;
}

const Column: React.FC<Props> = ({
  field,
  header,
  sortable,
  onColumnSort,
  sortField,
  sortOrder,
}) => {
  const handleClick = () => {
    if (sortable) {
      onColumnSort(field);
    }
  };

  return (
    <th onClick={handleClick}>
      {header}
      {sortable && field === sortField && (
        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
  );
};

export default Column;
