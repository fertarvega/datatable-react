import React from "react";
import TableColumn from "./TableColumn";

interface Props {
  children: React.ReactNode;
  onColumnSort?: (field: string) => void;
  sortField?: string | null;
  toggleAllRows?: (checked: boolean) => void;
  allRowsSelected?: boolean;
}

const TableHeader: React.FC<Props> = ({
  children,
  onColumnSort,
  sortField,
  toggleAllRows,
  allRowsSelected
}) => {
  return (
    <thead>
      <tr>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === TableColumn) {
            return React.cloneElement(child, {
              onColumnSort,
              sortField,
              toggleAllRows,
              allRowsSelected
            } as React.Attributes);
          }
          return child;
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
