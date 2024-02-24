import "../css/Datatable.css";
import React, { createContext, useCallback, useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export const TableContext = createContext<any>(null);

const Table = ({
  children,
  data,
  loading,
  height,
  infiniteScroll,
  updatePageNumber,
  infiniteScrollButton,
  onSelectionChange,
  selectAllOnLoad,
  stickyHeaders,
}: {
  children: React.ReactNode;
  data: any[];
  loading: boolean;
  height?: number; // si tiene infinitescroll y no tiene el boton, es obligatorio
  infiniteScroll?: boolean; // en pack junto con updatePageNumber
  updatePageNumber?: React.Dispatch<React.SetStateAction<any>>; // solo es util si tiene paginacion (se debe modificar a como se vaya a manejar en la API)
  infiniteScrollButton?: boolean; // en pack junto con infiniteScroll y updatePageNumber en caso de ser activado
  onSelectionChange?: React.Dispatch<React.SetStateAction<any[]>>; // es obligatorio si tiene checkbox alguna columna
  selectAllOnLoad?: boolean;
  stickyHeaders?: boolean;
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
    const auxSortedData = sortByStringNumberDate(
      arr.map((obj) => obj[field])
    ).map((item: any) => arr.find((obj) => obj[field] === item));

    setSortedData(auxSortedData);

    if (onSelectionChange) {
      onSelectionChange(selectAllOnLoad ? auxSortedData : []);
    }
    setSelectedRows(selectAllOnLoad ? auxSortedData : []);
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

  const handleScrollDefault = useCallback(
    (e: any) => {
      if ((!loading && !infiniteScroll) || infiniteScrollButton) return;
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (
        scrollHeight - scrollTop <= clientHeight * 1.5 &&
        !loading &&
        updatePageNumber
      ) {
        updatePageNumber((prevState: any) => ({
          ...prevState,
          actualPage: prevState.actualPage + 10,
        }));
      }
    },
    [loading]
  );

  const handleScrollButton = () => {
    if (!loading && updatePageNumber && infiniteScrollButton) {
      updatePageNumber((prevState: any) => ({
        ...prevState,
        actualPage: prevState.actualPage + 10,
      }));
    }
  };

  useEffect(() => {
    if (sortField) {
      handleColumnSort(sortField);
    } else {
      setSortedData(data);
      if (onSelectionChange) {
        onSelectionChange(selectAllOnLoad ? data : []);
      }
      setSelectedRows(selectAllOnLoad ? data : []);
    }
  }, [data]);

  return (
    <div
      className="table-container"
      onScroll={handleScrollDefault}
      style={{ overflowY: "auto", height: height ? `${height}px` : "auto" }}
    >
      {loading && !infiniteScroll ? (
        <Spinner />
      ) : (
        <table
          className={`responsive-table ${stickyHeaders && "sticky-headers"}`}
        >
          <TableContext.Provider
            value={{
              loading,
              sortedData,
              sortField,
              toggleRow,
              toggleAllRows,
              selectedRows,
              allRowsSelected: selectedRows.length === data.length,
              onColumnSort: handleColumnSort,
              infiniteScroll,
              infiniteScrollButton,
              handleScrollButton,
            }}
          >
            {children}
          </TableContext.Provider>
        </table>
      )}
    </div>
  );
};

export default Table;
