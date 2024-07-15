import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";

const initialValues = {
  title : "",
  description : "",
  status : ""
};

const Category = () => {

  const { enqueueSnackbar } = useSnackbar();

  const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
  
  const handleOnSubmit = async (values) => {
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/admin/category`,
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      data: {
        title : values.title,
        description : values.description,
        status : values.status
      },
    }).then(response =>{
    
        enqueueSnackbar('This is a success message!', { variant:"success" });
    
    }).catch(error=>{
      console.log(error);
    })
  };

  

  return (
    <div className="h-[100vh] mt-5">
      <Typography variant="h4" className="text-center">
        Add New Category
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
        <Form className="w-[100%]">
          <Field
            as={TextField}
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <Field
            as={TextField}
            name="description"
            label="Description"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <FormControl fullWidth>
            <InputLabel id="select-label">Status</InputLabel>
            <Field
              as={Select}
              labelId="select-label"
              id="select"
              label="Status"
              name="status"
            >
              <MenuItem value={true}>Hiển thị</MenuItem>
              <MenuItem value={false}>Không hiển thị </MenuItem>
            </Field>
          </FormControl>
          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Form>
      </Formik>
    </div>

    
  );
};

export default Category;
