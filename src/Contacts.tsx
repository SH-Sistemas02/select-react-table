import { useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import Modal from "react-bootstrap/Modal";
import SelectTable from "./SelectTable";

export interface ContactsProps {
  selecting: boolean;
  onClose: () => void;
}

function Contacts({ selecting, onClose: handleClose }: ContactsProps) {
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
    <Modal show={selecting} onExit={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Contact</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
}

export default Contacts;
