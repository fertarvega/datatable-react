import { useState, useEffect, useCallback } from "react";
import Datatable from "./components/Datatable";
import ButtonCustom from "./components/ButtonCustom";
import Table from "./NewTable/Table";
import TableColumn from "./NewTable/TableColumn";
import TableHeader from "./NewTable/TableHeader";
import TableBody from "./NewTable/TableBody";
import TableData from "./NewTable/TableData";

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
      // setTimeout(async () => {
      newItems.map((item: any) => {
        item.id = Math.floor(Math.random() * 100);
        item.details = { name: item.name, url: item.url};
        return item;
      });
      setTableRows((prevItems: any) => [...prevItems, ...newItems]);
      // }, 4000);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading) {
        setGeneralTableData((prevState: any) => ({
          ...prevState,
          actualPage: prevState.actualPage + 10,
        }));
      }
    },
    [loading]
  );

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    fetchItems(generalTableData.actualPage);
  }, [generalTableData]);

  return (
    <>
      <div>
        {/* {tableRows && (
          <Datatable
            handleScroll={handleScroll}
            data={tableRows}
            columns={columns}
            onSelectionChange={setSelectedRows}
            selectAllOnLoad
          />
        )} */}

        <Table
          data={tableRows}
          handleScroll={handleScroll}
          onSelectionChange={setSelectedRows}
        >
          <TableHeader>
            <TableColumn checkbox sortable field="id" sortField="id">
              ID
            </TableColumn>
            <TableColumn sortable field="name" sortField="name">
              Name
            </TableColumn>
            <TableColumn field="url">URL</TableColumn>
            <TableColumn field="details">Detalles</TableColumn>
          </TableHeader>
          <TableBody>
            <TableData checkbox field="id" />
            <TableData field="name" />
            <TableData field="url" />
            <TableData field="details" />
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default App;

// TODO:
// Insertar componentes o tener defaults en el td
// sticky header opcional
// infinite scroll opcional
// footer opcional
// que un objeto pueda tener checkbox (poder tener otro field para el check opcional?)
// loading de la paginacion
// loading de la carga inicial
// mensaje de error
// mensaje de no resultados