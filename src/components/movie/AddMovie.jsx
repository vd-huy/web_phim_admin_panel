import { Autocomplete, Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from "yup";

import FormikAutocomplete from './FormikAutocomplete';

const data = [
    { title: 'Movie 1', id: 1 },
    { title: 'Movie 2', id: 2 },
    { title: 'Movie 3', id: 3 },
    // Add your options here
  ];

const initialValues = {
    title : "",
    description : "",
    status : true,
    image : "",
    year : new Date().getFullYear(),
    time : "",
    categories:[],
    country:"",
    genres:[]
  };
  
  const validateSchema = Yup.object().shape({
    title : Yup.string().required("This field is required"),
    description : Yup.string().required("This field is required"),
    image : Yup.string().required("This field is required"),
    year : Yup.number()
                .required("Year is required")
                .min(1900, "Year must be greater than or equal to 1900")
                .max(new Date().getFullYear(), `Year must be less than or equal to ${new Date().getFullYear()}`),
    time : Yup.number().required("Time is required")
                        .min(0,"time must be greater 0"),

    categories : Yup.array().required("Provide at least one tag")
                            .min(1,"You must be Choose at least 1 "),
    genres : Yup.array().required("Provide at least one tag")
                        .min(1,"You must be Choose at least 1 ")
  });

const AddMovie = () => {

    const { enqueueSnackbar } = useSnackbar();

  const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
  
  const handleOnSubmit = async (values) => {
    // await axios({
    //   method: "POST",
    //   url: `${import.meta.env.VITE_API_URL}/api/admin/movie`,
    //   headers: {
    //     "Authorization" : `Bearer ${jwt}`,
    //     'Content-Type': 'application/json'
    //   },
    //   data: {
    //     title : values.title,
    //     description : values.description,
    //     status : values.status
    //   },
    // }).then(() =>{
    
    //     enqueueSnackbar('Add a new movie is successfully!', { variant:"success" });
    //     values.title = "";
    //     values.description = "";
    //     values.status = true;
    
    // }).catch(error=>{
    //   console.log(error);
    // })

    console.log(values);
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
          <div className="flex justify-between gap-8">
            <Field
              as={TextField}
              name="title"
              label="Title"
              variant="outlined"
              margin="normal"
              size="small"
              className="w-1/2 inline-block mr-4"
              padding="unset"
              //   InputProps={{ style: { height: '30px' , fontSize:"12px"} }}
            />

            <FormControl className="w-1/2 inline-block" margin="normal">
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
          </div>

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

          <Field
            as={TextField}
            name="year"
            label="Year of release"
            fullWidth
            size="small"
            variant="outlined"
            margin="normal"
          />
          <ErrorMessage name="image" component="div" style={{ color: "red" }} />

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

          <div className="w-full flex justify-between gap-8 ">
            <FormikAutocomplete
              options={data}
              name="categories"
              label="Select categories"
              placeholder="Categories"
            />

            <FormikAutocomplete
              options={data}
              name="genres"
              label="Select genres"
              placeholder="Genres"
            />

<Autocomplete
      disablePortal
      id="combo-box-demo"
      name="country"
      options={data}
      size="small"
      sx={{ width: '20%' }}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => <TextField {...params} label="Country" />}
    />

            
          </div>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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

export default AddMovie
