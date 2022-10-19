import { useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import Modal from "react-bootstrap/Modal";
import SelectTable from "./SelectTable";
import { Button } from "react-bootstrap";

export interface ContactsProps {
  selecting: boolean;
  onClose: () => void;
  onSelected: (value: string) => void;
}

function Contacts({ selecting, onClose: handleClose, onSelected }: ContactsProps) {
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
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    if (!selecting) {
      return;
    }

    fetch(`https://reqres.in/api/users?page=${page + 1}`)
      .then((response) => response.json())
      .then(({ total_pages, data, support }) => {
        console.log(support);
        setData(data);
        setTotalPages(total_pages);
      });
  }, [page, selecting]);

  return (
    <Modal show={selecting} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Contact</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>Please, select a contact.</div>

        <div>
          <SelectTable
            columns={columns}
            data={data}
            controlledPaging
            pageCount={totalPages}
            fetchData={({ page }) => {
              setPage(page);
            }}
            getRowId={(row) => row.id}
            onSelected={(selected) => {
              const keys = Object.keys(selected);
              setSelected(keys);
            }}
          />
        </div>

        <div>
          <Button onClick={() => {
              const [item] = selected;
              onSelected(item);
              handleClose();
          }} disabled={selected.length !== 1}>
            Seleccionar ({selected.length})
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Contacts;
