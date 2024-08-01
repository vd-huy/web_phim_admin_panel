import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../modal/ModalDelete";
import { fetchAllMovie } from "../../apis/movieApi";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import axios from "axios";

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

  const currentPage = sessionStorage.getItem("currentPage") || 0;

  const [page, setPage] = useState(currentPage);

  const rows = sessionStorage.getItem("rowsPerPage") || 4;


  const [rowsPerPage, setRowsPerPage] = useState(rows);
  const [totalElements, setTotalElements] = useState(5);
  const [title, setTitle] = useState("id");
  const [direction, setDirection] = useState("asc");

  const [dataRow, setDataRow] = useState([]);

  const [idDelete, setIdDelete] = useState();

  const categoryData = useSelector(state=>state.category.categoryList);
  const countryData = useSelector(state=>state.country.countryList);
  const genreData = useSelector(state=>state.genre.genreList);

  useEffect(() => {
    fetchAllMovie(jwt, page, rowsPerPage, title, direction).then((response) => {
      setTotalElements(response.data.totalElements);
      setDataRow(response.data.content);
    });
  }, [jwt, title, direction, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    sessionStorage.setItem("currentPage", newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    sessionStorage.setItem("rowsPerPage", event.target.value)
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

  const handleAdd =()=>{
    navigate('/movie/add-new');
  }

  const initialValues = {
    title: "",
    year: "",
    category:"" ,
    country:"" ,
    genre: ""
  }

  const handleOnSubmitFilter = async (values)=>{


    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/movie/filter?page=${page}&size=${rowsPerPage}&sortBy=${title}&direction=${direction}`,
      headers:{},
      data : {
        ...(values?.title && { title: values.title }),
        ...(values?.year && { year: values.year }),
        ...(values?.category && { category: values.category }),
        ...(values?.country && { country: values.country }),
        ...(values?.genre && { genre: values.genre }),
      }
    }).then(response=>{
      setTotalElements(response.data.totalElements);
      setDataRow(response.data.content);
    })
  }

  return (
    <div className="mt-2 ">
      <Typography variant="h4" className="text-center">
        Movie
      </Typography>

      <div className="flex justify-end my-4">
        <Button variant="contained" onClick={handleAdd}>
          Add new Movie
        </Button>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleOnSubmitFilter}>
        <Form className="m-auto mb-4">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2
            }}
          >
            <Typography sx={{ flex:1 }} variant="p" className="text-center">
              Filter movie
            </Typography>
            <Field

              as={TextField}
              name="title"
              label="Title"
              variant="outlined"
              margin="normal"
              size="small"
              className="inline-block mr-4 flex-[3]"
              padding="unset"
            />

            <Field
              as={TextField}
              name="year"
              label="Year"
              variant="outlined"
              margin="normal"
              size="small"
              className="inline-block mr-4 flex-[1]"
              padding="unset"
            />

            <FormControl sx={{ flex: 2 }}>
              <InputLabel id="select-label">Category</InputLabel>
              <Field
                as={Select}
                labelId="select-label"
                id="select"
                label="Category"
                name="category"
              >
                <MenuItem  value="">
                      All Categories
                    </MenuItem>
                {categoryData.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.title}>
                      {category.title}
                    </MenuItem>
                  );
                })}
              </Field>
            </FormControl>

            <FormControl sx={{ flex: 2 }}>
              <InputLabel id="select-label">Country</InputLabel>
              <Field
                as={Select}
                labelId="select-label"
                id="select"
                label="Country"
                name="country"
              >
                <MenuItem  value="">
                      All Country
                    </MenuItem>
                {countryData.map((country) => {
                  return (
                    <MenuItem key={country.id} value={country.title}>
                      {country.title}
                    </MenuItem>
                  );
                })}
              </Field>
            </FormControl>

            <FormControl sx={{ flex: 2 }}>
              <InputLabel id="select-label">Genre</InputLabel>
              <Field
                as={Select}
                labelId="select-label"
                id="select"
                label="Genre"
                name="genre"
              >
                <MenuItem  value="">
                      All Genres
                    </MenuItem>
                {genreData.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.title}>
                      {genre.title}
                    </MenuItem>
                  );
                })}
              </Field>
            </FormControl>

            <Button
              sx={{
                height: "30px",
              }}
              type="submit"
              variant="contained"
            >
              Duyệt Phim
            </Button>
          </Box>
        </Form>
      </Formik>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight:440}}>
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
                        <TableCell
                          sx={{ maxWidth: "340px" }}
                          key={column.id}
                          align={column.align}
                        >
                          {column.id !== "action" && column.id !== "image" ? (
                            column.format ? (
                              column.format(value)
                            ) : (
                              value
                            )
                          ) : column.id === "image" ? (
                            <img
                              src={value}
                              alt=""
                              className="h-auto w-11"
                              loading="lazy"
                            />
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
              title={"Movie"}
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
    </div>
  );
};

export default Movie;
