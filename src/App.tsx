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
  const [tableRows, setTableRows] = useState<any>([
    {
      id: 1,
      name: "Monkey D. Luffy",
      born_date: "05/05/1997",
      bounty: "$3,000,000,000",
      age: 26,
      details: { name: "Monkey D. Luffy", url: "https://example.com/luffy" },
    },
    {
      id: 2,
      name: "Roronoa Zoro",
      born_date: "11/11/1997",
      bounty: "$1,111,000,000",
      age: 26,
      details: { name: "Roronoa Zoro", url: "https://example.com/zoro" },
    },
    {
      id: 3,
      name: "Tony Tony Chopper",
      born_date: "24/12/1992",
      bounty: "$1,000",
      age: 31,
      details: {
        name: "Tony Tony Chopper",
        url: "https://example.com/chopper",
      },
    },
    {
      id: 4,
      name: "Nico Robin",
      born_date: "06/02/1992",
      bounty: "$930,000,000",
      age: 32,
      details: { name: "Nico Robin", url: "https://example.com/robin" },
    },
    {
      id: 5,
      name: "Franky",
      born_date: "09/03/1986",
      bounty: "$394,000,000",
      age: 37,
      details: { name: "Franky", url: "https://example.com/franky" },
    },
    {
      id: 6,
      name: "Nami",
      born_date: "03/07/1997",
      bounty: "$366,000,000",
      age: 26,
      details: { name: "Nami", url: "https://example.com/nami" },
    },
    {
      id: 7,
      name: "Vinsmoke Sanji",
      born_date: "03/03/1997",
      bounty: "$1,032,000,000",
      age: 27,
      details: { name: "Vinsmoke Sanji", url: "https://example.com/sanji" },
    },
    {
      id: 8,
      name: "Brook",
      born_date: "03/04/1959",
      bounty: "$383,000,000",
      age: 64,
      details: { name: "Brook", url: "https://example.com/brook" },
    },
    {
      id: 9,
      name: "Jimbei",
      born_date: "02/04/1976",
      bounty: "$938,000,000",
      age: 47,
      details: { name: "Jimbei", url: "https://example.com/jimbei" },
    },
    {
      id: 10,
      name: "Edward Newgate",
      born_date: "06/04/1952",
      bounty: "$5,046,000,000",
      age: 71,
      details: { name: "Edward Newgate", url: "https://example.com/newgate" },
    },
    {
      id: 11,
      name: "Marco",
      born_date: "05/10/1985",
      bounty: "$1,374,000,000",
      age: 38,
      details: { name: "Marco", url: "https://example.com/marco" },
    },
    {
      id: 12,
      name: "Jozu",
      born_date: "01/03/1978",
      bounty: "$1,076,000,000",
      age: 45,
      details: { name: "Jozu", url: "https://example.com/jozu" },
    },
    {
      id: 13,
      name: "Vista",
      born_date: "05/02/1979",
      bounty: "$1,830,000,000",
      age: 44,
      details: { name: "Vista", url: "https://example.com/vista" },
    },
  ]);
  const [generalTableData, setGeneralTableData] = useState<any>({
    totalPages: 30,
    actualPage: 0,
  });
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  // const getPokemonAPI = async (page: number) => {
  //   const results: any = fetch(
  //     `https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=10`
  //   ).then((response) => {
  //     const res = response.json().then((data) => {
  //       // console.log(data);
  //       return data.results;
  //     });
  //     return res;
  //   });
  //   return results;
  // };

  // const fetchItems = async (pageNum: any) => {
  //   setLoading(true);
  //   try {
  //     if (pageNum > generalTableData.totalPages) return;
  //     const newItems = await getPokemonAPI(pageNum);
  //     setTimeout(async () => {
  //       await newItems.map((item: any) => {
  //         item.id = Math.floor(Math.random() * 100);
  //         item.details = { name: item.name, url: item.url };
  //         return item;
  //       });
  //       setTableRows((prevItems: any) => [...prevItems, ...newItems]);
  //       setLoading(false);
  //     }, 4000);
  //   } catch (error) {
  //     console.error("Error fetching items:", error);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    // fetchItems(generalTableData.actualPage);
  }, [generalTableData]);

  return (
    <>
      <Table
        data={tableRows}
        loading={false}
        // onSelectionChange={setSelectedRows}
        infiniteScroll
        height={400}
        isError={false}
        errorComponent={<p>Error</p>}
      >
        <TableHeader>
          <TableColumn field="name" sortable>
            Name
          </TableColumn>
          <TableColumn field="born_date" sortable>
            born_date
          </TableColumn>
          <TableColumn field="bounty" sortable typeSortField="currency">
            bounty
          </TableColumn>
          <TableColumn field="age" sortable>
            Edad
          </TableColumn>
          <TableColumn field="details" sortable typeSortField="object" sortField="name">
            Detalles
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableData field="name" type="default" />
          <TableData field="born_date" type="default" />
          <TableData field="bounty" type="default" />
          <TableData field="age" type="default" />
          <TableData field="details" type="custom">
            <ButtonCustom>Status:</ButtonCustom>
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
