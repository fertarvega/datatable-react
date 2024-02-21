// DataTable.tsx
import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "../css/Datatable.css";

interface Props {
  columns: {
    field: string;
    name: string;
    sortable: boolean;
    render?: (data: any) => React.ReactNode;
    checkbox?: boolean; // Nueva prop para indicar si la columna es un checkbox
  }[];
  data: any[];
  handleScroll: (e: any) => void;
  onSelectionChange: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataTable: React.FC<Props> = ({
  columns,
  data,
  handleScroll,
  onSelectionChange,
}) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sortedData, setSortedData] = useState<any[]>(data);
  const [defaultData, setDefaultData] = useState<any[]>(data);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    "default"
  );

  const toggleAllRows = (checked: boolean) => {
    const newSelectedRows = checked ? [...data] : [];
    setSelectedRows(newSelectedRows);
    onSelectionChange(newSelectedRows);
  };

  const toggleRow = (row: any) => {
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
  };

  const handleColumnSort = (field: string) => {
    setSortField(field);
    if (sortOrder === "asc") {
      setSortOrder("desc");
      handleSort(data, field);
    } else if (sortOrder === "desc") {
      setSortOrder("default");
      setSortedData(defaultData);
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
    function convertToDate(fechaStr: string): Date {
      const partes = fechaStr.split("/");
      return new Date(
        parseInt(partes[2]),
        parseInt(partes[1]) - 1,
        parseInt(partes[0])
      );
    }

    if (typeof arr[0] === "number") {
      if (sortOrder === "asc") {
        arr.sort((a: number, b: number) => a - b);
      } else {
        arr.sort((a: number, b: number) => b - a);
      }
    } else if (
      typeof arr[0] === "string" &&
      arr[0].match(/^\d{2}\/\d{2}\/\d{4}$/)
    ) {
      if (sortOrder === "asc") {
        arr.sort(
          (a: string, b: string) =>
            convertToDate(a).getTime() - convertToDate(b).getTime()
        );
      } else {
        arr.sort(
          (a: string, b: string) =>
            convertToDate(b).getTime() - convertToDate(a).getTime()
        );
      }
    } else {
      if (sortOrder === "asc") {
        arr.sort();
      } else {
        arr.sort().reverse();
      }
    }

    return arr;
  }

  useEffect(() => {
    setSortedData(data);
    setDefaultData(data);
  }, [data]);

  return (
    <div
      className="table-container"
      onScroll={handleScroll}
      style={{ overflowY: "auto", height: "400px" }}
    >
      <table className="responsive-table">
        <TableHeader
          columns={columns}
          toggleAllRows={toggleAllRows}
          allRowsSelected={selectedRows.length === data.length}
          onColumnSort={handleColumnSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />
        <TableBody
          columns={columns}
          data={sortedData}
          selectedRows={selectedRows}
          toggleRow={toggleRow}
        />
      </table>
    </div>
  );
};

export default DataTable;
