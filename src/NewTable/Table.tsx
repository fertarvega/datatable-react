import "../css/Datatable.css";
import React, { createContext, useCallback, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import TableFooter from "./TableFooter";

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
  isError,
  errorComponent,
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
  isError: boolean;
  errorComponent: React.ReactNode;
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

  const handleColumnSort = (
    field: string,
    specialType?: string,
    sortFieldSpecial?: string
  ) => {
    setSortField(field);
    if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortedData(
        sortByProperty([...data], field, specialType, sortFieldSpecial)
      );
    } else if (sortOrder === "desc") {
      setSortOrder("default");
      setSortedData(data);
    } else {
      setSortOrder("asc");
      setSortedData(
        sortByProperty([...data], field, specialType, sortFieldSpecial)
      );
    }
  };

  const sortByProperty = (
    arr: any,
    property: string,
    specialType?: string,
    sortFieldSpecial?: string
  ) => {
    function convertToDate(dateStr: string): Date {
      const parts = dateStr.split("/");
      return new Date(
        parseInt(parts[2]),
        parseInt(parts[1]) - 1,
        parseInt(parts[0])
      );
    }

    return arr.sort((a: any, b: any) => {
      if (specialType === "currency") {
        return sortOrder === "asc"
          ? parseFloat(a[property].replace(/[$,]/g, "")) -
              parseFloat(b[property].replace(/[$,]/g, ""))
          : parseFloat(b[property].replace(/[$,]/g, "")) -
              parseFloat(a[property].replace(/[$,]/g, ""));
      }
      if (specialType === "object" && sortFieldSpecial) {
        if (
          typeof a[sortFieldSpecial] === "string" &&
          a[sortFieldSpecial].match(/^\d{2}\/\d{2}\/\d{4}$/)
        ) {
          return sortOrder === "asc"
            ? convertToDate(a[sortFieldSpecial]).getTime() -
                convertToDate(b[sortFieldSpecial]).getTime()
            : convertToDate(b[sortFieldSpecial]).getTime() -
                convertToDate(a[sortFieldSpecial]).getTime();
        }
        if (typeof a[sortFieldSpecial] === "number") {
          return sortOrder === "asc"
            ? a[sortFieldSpecial] - b[sortFieldSpecial]
            : b[sortFieldSpecial] - a[sortFieldSpecial];
        }
        if (typeof a[sortFieldSpecial] === "string") {
          return sortOrder === "asc"
            ? a[sortFieldSpecial].localeCompare(b[sortFieldSpecial])
            : b[sortFieldSpecial].localeCompare(a[sortFieldSpecial]);
        }
      }
      if (
        typeof a[property] === "string" &&
        a[property].match(/^\d{2}\/\d{2}\/\d{4}$/)
      ) {
        return sortOrder === "asc"
          ? convertToDate(a[property]).getTime() -
              convertToDate(b[property]).getTime()
          : convertToDate(b[property]).getTime() -
              convertToDate(a[property]).getTime();
      }
      if (typeof a[property] === "number") {
        return sortOrder === "asc"
          ? a[property] - b[property]
          : b[property] - a[property];
      }
      if (typeof a[property] === "string") {
        return sortOrder === "asc"
          ? a[property].localeCompare(b[property])
          : b[property].localeCompare(a[property]);
      }
    });
  };

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
    <>
      {isError && errorComponent ? (
        <>{errorComponent}</>
      ) : (
        <>
          <div
            className="table-container"
            onScroll={handleScrollDefault}
            style={{
              overflowY: "auto",
              height: height ? `${height}px` : "auto",
            }}
          >
            {loading && !infiniteScroll ? (
              <Spinner />
            ) : (
              <>
                {sortedData.length === 0 ? (
                  <p>No hay datos</p>
                ) : (
                  <table
                    className={`responsive-table ${
                      stickyHeaders && "sticky-headers"
                    }`}
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
                      {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                          if (child.type !== TableFooter) {
                            return child;
                          }
                        }
                        return null;
                      })}
                    </TableContext.Provider>
                  </table>
                )}
              </>
            )}
          </div>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              if (child.type === TableFooter) {
                return <>{child}</>;
              }
            }
            return null;
          })}
        </>
      )}
    </>
  );
};

export default Table;
