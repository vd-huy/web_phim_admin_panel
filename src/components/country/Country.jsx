import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import * as Yup from "yup";
import ShowAllCountry from './ShowAllCountry';

const initialValues = {
    title : "",
    description : "",
    status : true
  };
  
  const validateSchema = Yup.object().shape({
    title : Yup.string().required("This field is required"),
    description : Yup.string().required("This field is required"),
  });
  
const Country = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [success,setSuccess] = useState(0);


  const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
  
  const handleOnSubmit = async (values) => {
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/admin/country`,
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
    
        enqueueSnackbar('Add a new category is successfully!', { variant:"success" });
        values.title = "";
        values.description = "";
        values.status = true;

        setSuccess(prev => prev = prev + 1);
    
    }).catch(error=>{
      console.log(error);
    })
  };

  console.log(success);
  return (
    <div className="h-auto mt-5">
      <Typography variant="h4" className="text-center">
        Add New Country
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
            Add
          </Button>
        </Form>
      </Formik>

      <div className="mt-5" >
        <Typography variant="h6" className="pl-4">
          All Off Country
        </Typography>
        <ShowAllCountry success={success}/>
      </div>

    </div>
  )
}

export default Country
