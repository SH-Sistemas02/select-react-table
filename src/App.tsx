import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { Column } from "react-table";
import SelectTable from "./SelectTable";

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const columns = useMemo<Column<any>[]>(
    () => [
      {
        accessor: "id",
        Header: "id",
      },
      {
        accessor: "email",
        Header: "email",
      },
      {
        accessor: "first_name",
        Header: "Name",
      },
      {
        accessor: "last_name",
        Header: "Last name",
      },
    ],
    []
  );

  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${page + 1}`)
      .then((response) => response.json())
      .then(({ total_pages, data, support }) => {
        console.log(support);
        setData(data);
        setTotalPages(total_pages);
      });
  }, [page]);

  return (
    <div className="App">
      <Container>
        <SelectTable
          columns={columns}
          data={data}
          controlledPaging
          pageCount={totalPages}
          fetchData={({ page }) => {
            setPage(page);
          }}
          getRowId={(row) => row.id}
        />
      </Container>
    </div>
  );
}
