import React from "react";

const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};

export default TableHeader;
