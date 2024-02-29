import { useState, useEffect, useCallback } from "react";
import Datatable from "./components/Datatable";
import ButtonCustom from "./components/ButtonCustom";
import Table from "./NewTable/Table";
import TableColumn from "./NewTable/TableColumn";
import TableHeader from "./NewTable/TableHeader";
import TableBody from "./NewTable/TableBody";
import TableData from "./NewTable/TableData";
import TableFooter from "./NewTable/TableFooter";

const App = () => {
  const columns = [
    {
      field: "id",
      name: "ID",
      sortable: true,
      checkbox: true,
    },
    {
      field: "name",
      name: "Name",
      sortable: true,
      checkbox: true,
    },
    {
      field: "url",
      name: "URL",
      sortable: true,
      render: (field: any) => (
        <div>
          <ButtonCustom onClick={() => alert("Yeah! " + field)}>
            Status: {field}
          </ButtonCustom>
        </div>
      ),
    },
  ];

  const [tableRows, setTableRows] = useState<any>([]);
  const [generalTableData, setGeneralTableData] = useState<any>({
    totalPages: 30,
    actualPage: 0,
  });
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const getPokemonAPI = async (page: number) => {
    const results: any = fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=10`
    ).then((response) => {
      const res = response.json().then((data) => {
        // console.log(data);
        return data.results;
      });
      return res;
    });
    return results;
  };

  const fetchItems = async (pageNum: any) => {
    setLoading(true);
    try {
      if (pageNum > generalTableData.totalPages) return;
      const newItems = await getPokemonAPI(pageNum);
      setTimeout(async () => {
        await newItems.map((item: any) => {
          item.id = Math.floor(Math.random() * 100);
          item.details = { name: item.name, url: item.url };
          return item;
        });
        setTableRows((prevItems: any) => [...prevItems, ...newItems]);
        setLoading(false);
      }, 4000);
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    fetchItems(generalTableData.actualPage);
  }, [generalTableData]);

  return (
    <>
      <Table
        data={tableRows}
        loading={loading}
        onSelectionChange={setSelectedRows}
        infiniteScroll
        height={400}
        updatePageNumber={setGeneralTableData}
        // infiniteScrollButton
        // selectAllOnLoad
        // stickyHeaders
        isError={false}
        errorComponent={<p>Error</p>}
      >
        <TableHeader>
          <TableColumn sortable field="id" sortField="id">
            ID
          </TableColumn>
          <TableColumn sortable field="name" sortField="name">
            Name
          </TableColumn>
          <TableColumn field="url">URL</TableColumn>
          <TableColumn checkbox field="details">Detalles</TableColumn>
        </TableHeader>
        <TableBody>
          <TableData field="id" type="default" />
          <TableData field="name" type="default" />
          <TableData field="url" type="default" />
          <TableData checkbox field="details" type="custom">
            <ButtonCustom onClick={() => alert("Yeah! ")}>Status:</ButtonCustom>
          </TableData>
        </TableBody>
        <TableFooter>
          <p>Test</p>
        </TableFooter>
      </Table>
    </>
  );
};

export default App;

// TODO:
// en la primer carga (al usar infinite scroll) usar el loading de toda la tabla
// que el boton o spinner no se muestre si no hay mas resultados y no mueva la tabla