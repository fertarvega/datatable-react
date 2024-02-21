import "../css/Datatable.css";

const Datatable = ({ columns, data, handleScroll }: { columns: any; data: any, handleScroll: any }) => {
  return (
    <div className="table-container" onScroll={handleScroll} style={{ overflowY: "auto", height: "400px" }}>
      <table className="responsive-table">
        <thead>
          <tr>
            {columns.map((column: any, index: any) => (
              <th key={index}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: any) => (
            <tr key={rowIndex}>
              {columns.map((column: any, colIndex: any) => (
                <td key={colIndex}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
