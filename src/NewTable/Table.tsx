import "../css/Datatable.css";
import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

interface Props {
  children: React.ReactNode;
  data: any[];
  handleScroll: (e: any) => void;
  onSelectionChange?: React.Dispatch<React.SetStateAction<any[]>>;
}

const Table: React.FC<Props> = ({
  children,
  data,
  handleScroll,
  onSelectionChange,
}) => {
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    "default"
  );
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const toggleAllRows = (checked: boolean) => {
    if (onSelectionChange) {
      const newSelectedRows = checked ? [...data] : [];
      setSelectedRows(newSelectedRows);
      onSelectionChange(newSelectedRows);
    }
  };

  const toggleRow = (row: any) => {
    if (onSelectionChange) {
      const rowIndex = selectedRows.findIndex(
        (selectedRow) => selectedRow === row
      );
      let newSelectedRows: any[];
      if (rowIndex !== -1) {
        newSelectedRows = selectedRows.filter((_, index) => index !== rowIndex);
      } else {
        newSelectedRows = [...selectedRows, row];
      }
      setSelectedRows(newSelectedRows);
      onSelectionChange(newSelectedRows);
    }
  };

  const handleColumnSort = (field: string) => {
    setSortField(field);
    if (sortOrder === "asc") {
      setSortOrder("desc");
      handleSort(data, field);
    } else if (sortOrder === "desc") {
      setSortOrder("default");
      setSortedData(data);
    } else {
      setSortOrder("asc");
      handleSort(data, field);
    }
  };

  function handleSort(arr: any[], field: string) {
    setSortedData(
      sortByStringNumberDate(arr.map((obj) => obj[field])).map((item: any) =>
        arr.find((obj) => obj[field] === item)
      )
    );
  }

  function sortByStringNumberDate(arr: any[]) {
    function convertToDate(dateStr: string): Date {
      const parts = dateStr.split("/");
      return new Date(
        parseInt(parts[2]),
        parseInt(parts[1]) - 1,
        parseInt(parts[0])
      );
    }

    if (typeof arr[0] === "number") {
      return sortOrder === "asc"
        ? arr.sort((a, b) => a - b)
        : arr.sort((a, b) => b - a);
    } else if (
      typeof arr[0] === "string" &&
      arr[0].match(/^\d{2}\/\d{2}\/\d{4}$/)
    ) {
      return sortOrder === "asc"
        ? arr.sort(
            (a, b) => convertToDate(a).getTime() - convertToDate(b).getTime()
          )
        : arr.sort(
            (a, b) => convertToDate(b).getTime() - convertToDate(a).getTime()
          );
    } else {
      return sortOrder === "asc" ? arr.sort() : arr.sort().reverse();
    }
  }

  useEffect(() => {
    if (sortField) {
      handleColumnSort(sortField);
    } else {
      setSortedData(data);
    }
  }, [data]);

  return (
    <div
      className="table-container"
      onScroll={handleScroll}
      style={{ overflowY: "auto", height: "400px" }}
    >
      <table className="responsive-table">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === TableHeader) {
              return React.cloneElement(child, {
                onColumnSort: handleColumnSort,
                sortField,
                toggleAllRows,
                allRowsSelected: selectedRows.length === data.length,
              } as React.Attributes);
            } else if (child.type === TableBody) {
              return React.cloneElement(child, {
                data: sortedData,
                toggleRow,
                selectedRows,
              } as React.Attributes);
            } else {
              return child;
            }
          }
          return null;
        })}
      </table>
    </div>
  );
};

export default Table;
