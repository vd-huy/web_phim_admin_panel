import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../modal/ModalDelete";
import { fetchAllMovie } from "../../apis/movieApi";
import { useEffect, useState } from "react";

const columns = [
  { id: "image", label: "poster", minWidth: 50, align: "left" },
  { id: "title", label: "Title", minWidth: 170, maxWidth : 200 },
  // { id: "originName", label: "Origin Name", minWidth: 170 },
  { id: "year", label: "Year", minWidth: 50 },
  { id: "updatedTime", label: "Updated", minWidth: 100 },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    format: (value) => (value === true ? "Hiển thị" : "Không hiển thị"),
  },
  { id: "action", label: "Action", minWidth: 170, align: "center" },
];

const Movie = () => {
  const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalElements, setTotalElements] = useState(5);
  const [title, setTitle] = useState("id");
  const [direction, setDirection] = useState("asc");

  const [dataRow, setDataRow] = useState([]);

  const [idDelete, setIdDelete] = useState();

  useEffect(() => {
    fetchAllMovie(jwt, page, rowsPerPage, title, direction).then((response) => {
      setTotalElements(response.data.totalElements);
      setDataRow(response.data.content);
    });
  }, [jwt, title, direction, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDirection = (value) => {
    setTitle(value);
    setDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
  };

  const handleUpdate = (value) => {
    navigate(`/movie/update/${value.id}`, { state: { data: value } });
  };

  // open modal delete
  const [open, setOpen] = useState(false);

  const handleDelete = (value) => {
    setOpen(true);
    // setIdDelete(value.id);
  };

  const closeModal = () => {
    setOpen(false);
    // fetchAllMovie(jwt, page, rowsPerPage, title, direction).then(
    //   (response) => {
    //     setTotalElements(response.data.totalElements);
    //     setDataRow(response.data.content);
    //     console.log(response);
    //   }
    // );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.id !== "image" && column.id !== "action" && (
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleDirection(column.id);
                      }}
                    >
                      {title === column.id ? (
                        direction === "asc" ? (
                          <ExpandMoreIcon fontSize="small" />
                        ) : (
                          <KeyboardArrowUpIcon fontSize="small" />
                        )
                      ) : (
                        <ExpandMoreIcon fontSize="small" />
                      )}
                    </IconButton>
                  )}
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRow?.map((row, index) => {
              return (
                <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell sx={{ maxWidth: '340px' }} key={column.id} align={column.align}>
                        {column.id !== "action" && column.id !== "image"? (
                          column.format ? (
                            column.format(value)
                          ) : (
                            value
                          )
                        ) : column.id === "image" ? (
                          <img src={value} alt="" className="h-auto w-11" loading="lazy" />
                          
                        ) : (
                          <div className="flex justify-between">
                            <Button
                              sx={{ color: "#ddeaf5" }}
                              variant="contained"
                              onClick={() => {
                                handleUpdate(row);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                handleDelete(row);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <ModalDelete
            title={"genre"}
            id={idDelete}
            show={open}
            onRequestClose={closeModal}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 10, 15]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Movie;
