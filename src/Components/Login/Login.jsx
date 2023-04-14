import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errMessage, seterrMessage] = useState("");
  async function sendLoginDataToApi(values) {
    setisLoading(true);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)
      .catch((err) => {
        setisLoading(false);
        seterrMessage(err.response.data.errors.msg);
      });
    console.log(data.message);
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      saveUserData();
      setisLoading(false);
      navigate("/");
    }
    console.log(formik.errors);
  }
  let validate = yup.object({
    email: yup.string().required("Email is required").email("email invalid"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password should match with this patern (M12345)"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: sendLoginDataToApi,
  });
  return (
    <>
      <div className=" w-75 mx-3">
        <h2>LOGIN NOW </h2>

        {errMessage ? (
          <div className=" alert alert-danger">{errMessage}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email"> email :</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className=" pb-2 form-control "
          />
          {formik.errors.email && formik.touched.email ? (
            <div className=" alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password"> password :</label>
          <input
            onBlur={formik.handleBlur}
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className=" pb-2 form-control "
          />
          {formik.errors.password && formik.touched.password ? (
            <div className=" alert alert-danger">{formik.errors.password}</div>
          ) : null}

          {isLoading ? (
            <button
              type="button"
              className=" btn btn-info border-0 mx-auto my-2"
            >
              <i className=" fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              type="submit"
              className=" btn btn-info border-0 mx-auto my-2"
            >
              submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
