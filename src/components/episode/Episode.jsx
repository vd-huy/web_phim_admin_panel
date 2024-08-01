import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import * as Yup from "yup";



const validateSchema = Yup.object().shape({
  episodeData: Yup.string().required("This field is required"),
  server: Yup.string().required("This field is required"),
});

const Episode = ({sv,dataEpisode}) => {
  
    const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");

    const {id} = useParams();

    const initialValues = {
      episodeData: dataEpisode,
      server: sv.server,
    };

  const handleSubmit = async (values) => {
  
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/admin/episode/add/${id}`,
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      data: {
        episodeData : values.episodeData,
        server : values.server,
      },
    }).then(() =>{

        enqueueSnackbar('Update movie is successfully!', { variant:"success" });


    }).catch(error=>{
      console.log(error);
    })
  };

  return (
    <div className="mt-2">
      
     
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validateSchema}
        >
          <Form className="w-[90%] m-auto mb-4 mt-3">
            <Field
              as={TextareaAutosize}
              name="episodeData"
              label="episode Data"
              variant="outlined"
              margin="normal"
              className="w-full h-[80px] p-2 border-gray-400 border border-solid rounded-md"
              minRows="4"
            />
            <ErrorMessage name="episodeData" component="div" style={{ color: "red" }} />
            <Field
              as={TextField}
              name="server"
              label="Server"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              className="inline-block mr-4"
              padding="unset"
            />
            <ErrorMessage name="server" component="div" style={{ color: "red" }} />
    
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
                Add Episode
              </Button>
            </Box>
          </Form>
        </Formik>
    </div>
  );
};

export default Episode;
