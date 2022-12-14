import { useEffect } from "react";
import {
  CellProps,
  Column,
  IdType,
  Row,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import BTable, { TableProps } from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Checkbox from "./Checkbox";

export interface SelectTableProps<T extends object> extends TableProps {
  columns: Column<T>[];
  data: T[];
  controlledPaging?: boolean;
  pageCount?: number;
  fetchData?: {
    (table: { page: number; pageSize: number }): void;
  };
  getRowId?: {
    (row: T, relativeIndex: number, parent?: Row<T> | undefined): string;
  };
  onSelected?: {
    (values: Record<IdType<T>, boolean>): void;
  };
}

function SelectTable<T extends object>(props: SelectTableProps<T>) {
  const {
    columns,
    data,
    controlledPaging,
    fetchData,
    pageCount: controlledPageCount,
    getRowId,
    onSelected: handleSelected,
    ...p
  } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      manualPagination: controlledPaging,
      pageCount: controlledPageCount,
      autoResetSelectedRows: false,
      getRowId,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Cell: ({ row }: CellProps<T>) => (
            <Checkbox
              {...row.getToggleRowSelectedProps()}
              aria-label="selection"
            />
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    if (!controlledPaging) {
      return;
    }

    fetchData?.({
      page: pageIndex,
      pageSize,
    });
  }, [controlledPaging, fetchData, pageIndex, pageSize]);

  useEffect(() => {
    handleSelected?.(selectedRowIds);
  }, [handleSelected, selectedRowIds]);

  return (
    <>
      <BTable {...p} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>

      <Pagination>
        <Pagination.First
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        />
        <Pagination.Prev onClick={previousPage} disabled={!canPreviousPage} />
        <Pagination.Next onClick={nextPage} disabled={!canNextPage} />
        <Pagination.Last
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        />
      </Pagination>
    </>
  );
}

export default SelectTable;
