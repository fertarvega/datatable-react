// DataTable.tsx
import React, { useState } from "react";
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
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">("default");

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
    console.log(ordenarPorNombre(data, "id"));
    console.log(sortOrder);
    
    if (sortField === field) {
      if(sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortOrder("default");
      } else {
        setSortOrder("asc");
      }
      // setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Función para ordenar los datos según el campo y el orden actual de clasificación
  const sortedData: any = [];
  // data.slice().sort((a, b) => {
  // if (sortField && sortOrder) {
  //   const compareResult = a[sortField].localeCompare(b[sortField]);
  //   return sortOrder === "asc" ? compareResult : -compareResult;
  // }
  // return 0;
  // });

  function ordenarStringsYNumerosYFechas(arr: any[]): any[] {
    // Función para convertir strings de fecha a objetos Date
    function convertirAFecha(fechaStr: string): Date {
      const partes = fechaStr.split("/");
      return new Date(
        parseInt(partes[2]),
        parseInt(partes[1]) - 1,
        parseInt(partes[0])
      );
    }

    // Comprueba si el primer elemento del array es un número
    if (typeof arr[0] === "number") {
      // Si es un número, simplemente ordena el array
      arr.sort((a: number, b: number) => a - b);
    } else if (
      typeof arr[0] === "string" &&
      arr[0].match(/^\d{2}\/\d{2}\/\d{4}$/)
    ) {
      // Si es una fecha en formato de string "DD/MM/AAAA", conviértela a objeto Date y luego ordena
      arr.sort(
        (a: string, b: string) =>
          convertirAFecha(a).getTime() - convertirAFecha(b).getTime()
      );
    } else {
      // Si no es un número ni una fecha en formato de string, ordena el array de strings
      arr.sort();
    }
    return arr;
  }

  function ordenarPorNombre(arr: any[], field: string) {
    return ordenarStringsYNumerosYFechas(arr.map((obj) => obj[field])).map(
      (item) => arr.find((obj) => obj[field] === item)
    );
  }

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
