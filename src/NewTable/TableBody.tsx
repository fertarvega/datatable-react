import React, { useContext } from "react";
import { TableContext } from "./Table";
import TableData from "./TableData";
import Spinner from "../components/Spinner";
import ButtonCustom from "../components/ButtonCustom";

const TableBody = ({ children }: { children: React.ReactNode }) => {
  const {
    sortedData,
    loading,
    infiniteScroll,
    infiniteScrollButton,
    handleScrollButton,
  } = useContext(TableContext);

  return (
    <>
      <tbody>
        {sortedData?.map((item: any, idx: any) => {
          return (
            <tr key={idx}>
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  if (child.type === TableData) {
                    const { field } = child.props;
                    if (!sortedData) return null;
                    return React.cloneElement(child, {
                      row: item,
                      field,
                    } as React.Attributes);
                  } else {
                    return child;
                  }
                }
                return null;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {loading && infiniteScroll && !infiniteScrollButton && (
          <tr>
            <td>
              <Spinner />
            </td>
          </tr>
        )}
        {infiniteScroll && infiniteScrollButton && (
          <tr>
            <td>
              {loading ? (
                <Spinner />
              ) : (
                <ButtonCustom onClick={() => handleScrollButton()}>
                  Cargar más...
                </ButtonCustom>
              )}
            </td>
          </tr>
        )}
      </tfoot>
    </>
  );
};

export default TableBody;
