import React from "react";
import TableData from "./TableData";
interface Props {
  children: React.ReactNode;
  data?: any[];
  toggleRow?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRows?: any[];
}

const TableBody: React.FC<Props> = ({
  children,
  data,
  toggleRow,
  selectedRows,
}) => {
  return (
    <tbody>
      {data?.map((item, idx) => {
        return (
          <tr key={idx}>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                if (child.type === TableData) {
                  const { field } = child.props;
                  if (!data) return null;
                  return React.cloneElement(child, {
                    row: item,
                    field,
                    toggleRow,
                    selectedRows,
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
  );
};

export default TableBody;
