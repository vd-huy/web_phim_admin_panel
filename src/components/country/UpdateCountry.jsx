import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";


const UpdateCountry = () => {
    window.scroll({
        top: 0,
        behavior: "smooth",
      });

    const navigate = useNavigate();

    const jwt = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");

    // get path variable
    const {id} = useParams();

    const value = useLocation().state.data;


    const initialValues = {
        title : value.title,
        description : value.description,
        status : value.status
      };

      const validateSchema = Yup.object().shape({
        title : Yup.string().required("This field is required"),
        description : Yup.string().required("This field is required"),
      });

      const handleOnSubmit = async (values) => {
        await axios({
          method: "PUT",
          url: `${import.meta.env.VITE_API_URL}/api/admin/country/${id}`,
          headers: {
            "Authorization" : `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          },
          data: {
            title : values.title,
            description : values.description,
            status : values.status
          },
        }).then(() =>{
        
            enqueueSnackbar('Update a new country is successfully!', { variant:"success" });
            navigate("/country")
        
        }).catch(error=>{
          console.log(error);
        })
      };

  return (
    <div className='mt-5 h-[100vh]'>
    <Typography variant="h4" className="text-center">
        Update Country
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema= {validateSchema}>
        <Form className="w-[90%] m-auto mb-4">
          <div className="flex justify-between gap-8">
            <Field
              as={TextField}
              name="title"
              label="Title"
              variant="outlined"
              margin="normal"
              className='w-1/2 inline-block mr-4'
            />
            
             <FormControl  className='w-1/2 inline-block' margin="normal">
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
          </div>

          <ErrorMessage name="title" component="div" style={{ color: 'red' }} />


          <Field
            as={TextField}
            name="description"
            label="Description"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <ErrorMessage name="description" component="div" style={{ color: 'red' }} />

          <Button
            sx={{ mt: 2, padding: "1rem", position:"static" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Update
          </Button>
        </Form>
      </Formik>
    </div>
  )
}


export default UpdateCountry
