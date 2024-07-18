import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from "yup";

import FormikAutocomplete from './FormikAutocomplete';
import { useSelector } from 'react-redux';

const initialValues = {
  title: "",
  originName: "",
  description: "",
  status: true,
  image: "",
  year: "",
  time: "",
  categories: [],
  countries: [],
  genres: []
};

const validateSchema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  originName: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
  year: Yup.number()
    .required("Year is required")
    .min(1900, "Year must be greater than or equal to 1900")
    .max(new Date().getFullYear(), `Year must be less than or equal to ${new Date().getFullYear()}`),
  time: Yup.number().required("Time is required")
    .min(0, "time must be greater 0"),

  categories: Yup.array().required("Provide at least one tag")
    .min(1, "You must be Choose at least 1 "),
  genres: Yup.array().required("Provide at least one tag")
    .min(1, "You must be Choose at least 1 "),
  countries: Yup.array().required("Provide at least one tag")
    .min(1, "You must be Choose at least 1 "),
});

const AddMovie = () => {

  const { enqueueSnackbar } = useSnackbar();

  const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");

  const dataCategory = useSelector(state => state.category.categoryList);

  const dataCountry = useSelector(state => state.country.countryList);

  const dataGenre = useSelector(state => state.genre.genreList);

  const handleOnSubmit = async (values,{resetForm }) => {

    const categoryIds = [];
    const genreIds = [];
    const countryIds = [];

    values.categories.map(category=>{
      categoryIds.push(category.id)
    })

    values.countries.map(country=>{
      countryIds.push(country.id)
    })

    values.genres.map(genre=>{
      genreIds.push(genre.id)
    })


    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/admin/movie`,
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      data: {
        title : values.title,
        originName : values.originName,
        description : values.description,
        status : values.status,
        image: values.image,
        year: values.year,
        time: values.time,
        categoryIds: categoryIds,
        countryIds: countryIds,
        genreIds: genreIds
      },
    }).then(() =>{

        enqueueSnackbar('Add a new movie is successfully!', { variant:"success" });
      
        resetForm();

    }).catch(error=>{
      console.log(error);
    })
  };

  return (
    <div className="h-auto mt-2">
      <Typography variant="h5" className="text-center">
        Add New Movie
      </Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={validateSchema}
      >
        <Form className="w-[90%] m-auto mb-4">
          <Box sx={{ display:"flex", justifyContent:"space-between", gap:"2rem" }}>
            <Field
              as={TextField}
              name="title"
              label="Title"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              className="inline-block mr-4"
              padding="unset"
            />

            <Field
              as={TextField}
              name="originName"
              label="Origin Name"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              className="inline-block mr-4"
              padding="unset"
            />

            <FormControl className="w-full inline-block" margin="normal">
              <InputLabel id="select-label">Status</InputLabel>
              <Field
                as={Select}
                labelId="select-label"
                id="select"
                size="small"
                label="Status"
                name="status"
              >
                <MenuItem value={true}>Hiển thị</MenuItem>
                <MenuItem value={false}>Không hiển thị </MenuItem>
              </Field>
            </FormControl>
          </Box>

          <ErrorMessage name="title" component="div" style={{ color: "red" }} />

          <Field
            as={TextField}
            name="description"
            label="Description"
            fullWidth
            size="small"
            variant="outlined"
            margin="normal"
          />
          <ErrorMessage
            name="description"
            component="div"
            style={{ color: "red" }}
          />

          <Field
            as={TextField}
            name="image"
            label="Image"
            fullWidth
            size="small"
            variant="outlined"
            margin="normal"
          />
          <ErrorMessage name="image" component="div" style={{ color: "red" }} />

          <Box sx={{ display:"flex", justifyContent:"space-between", gap:"2rem" }}>
            <Box sx={{ width:"50%" }}>
              <Field
                as={TextField}
                name="year"
                label="Year of release"
                fullWidth
                size="small"
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage name="year" component="div" style={{ color: "red" }} />
            </Box>

            <Box  sx={{ width:"50%" }}>
              <Field
                as={TextField}
                name="time"
                label="Time duration of the movie"
                fullWidth
                size="small"
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage name="time" component="div" style={{ color: "red" }} />
            </Box>
          </Box>

            <FormikAutocomplete
              options={dataCategory}
              name="categories"
              label="Select categories"
              placeholder="Categories"
            
            />

            <FormikAutocomplete
              options={dataGenre}
              name="genres"
              label="Select genres"
              placeholder="Genres"
              
            />

            <FormikAutocomplete
                options={dataCountry}
                name="countries"
                label="Select Countries"
                placeholder="Countries"
                
              />

          

          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Button
              sx={{
                padding: "1rem",
                position: "static",
                height: "30px",
                width: "50%",
              }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Form>
      </Formik>
    </div>
  );
}

export default AddMovie;
