import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import React from 'react'

const initialValues = {
  email: "",
  password: "",
  checked: false,
};

const Login = () => {

  // localStorage.removeItem("jwt");
  // localStorage.removeItem("expirationTime");

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState("");

  let jwt = "";

  const handleOnSubmit = async (values) => {
        const now = new Date();
        const expirationTime = now.getTime() + 86400 * 1000;
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/auth/signin`,
      headers: {},
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .then((res) => {
        jwt = res.data.jwt;
        navigate("/")
      })
      .catch((error) => {
        console.log(error.response.data.message);
        switch (error.response.status) {
          case 500:
            setError(error.response.data.message);
            setErrorField("email");
            break;
          case 401:
            setError(error.response.data.message);
            setErrorField("password");
        }
      });

    switch (values.checked) {
      case true:
        localStorage.setItem("jwt", jwt)
        localStorage.setItem("expirationTime", expirationTime);
        break;

      case false:
        sessionStorage.setItem("jwt", jwt);
        break;

      default:
        break;
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white lg:flex p-5 lg:w-[60%] w-[80%] rounded-lg lg:h-[80%] justify-center items-center">
        <div className="lg:w-[40%]">
          <img className="m-auto mb-10 lg:m-0"
            src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
            alt=""
          />
        </div>
        <div className="lg:w-[60%]">
          <Typography variant="h4" className="text-center">
            Login
          </Typography>

          <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
            <Form className="w-[100%] lg:w-[80%]">
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              {errorField === "email" && (
                <p className="text-red-500 text-sm my-2">{error}</p>
              )}
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
              />

              {errorField === "password" && (
                <p className="text-red-500 text-sm my-2">{error}</p>
              )}

              <label>
                <Field type="checkbox" name="checked" margin="normal" />
                <span className="ml-1 text-black">Remember me</span>
              </label>

              <Button
                sx={{ mt: 2, padding: "1rem" }}
                fullWidth
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
