import { useState, useEffect, useCallback } from "react";
import Datatable from "./components/Datatable";
import InfiniteScroll from "./components/InfiniteScroll";
import ButtonCustom from "./components/ButtonCustom";

// TODO: que el checkbox se seleccione solo

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
          <ButtonCustom onClick={() => alert("Clicked!")}>
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
        console.log(data);
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
        item.id = Math.floor(Math.random() * 50);
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
        {tableRows && (
          <Datatable
            handleScroll={handleScroll}
            data={tableRows}
            columns={columns}
            onSelectionChange={setSelectedRows}
          />
        )}
      </div>
      {/* <div style={{ marginTop: "3rem", border: "1px solid black" }}>
        <InfiniteScroll />
      </div> */}
    </>
  );
};

export default App;
