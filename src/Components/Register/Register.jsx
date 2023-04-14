import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errMessage, seterrMessage] = useState("");
  async function SentRegisterDataToApi(values) {
    setisLoading(true);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .catch((err) => {
        setisLoading(false);
        seterrMessage(err.response.data.errors.msg);
      });
    if (data.message == "success") {
      setisLoading(false);
      navigate("/login");
    }
  }
  let validate = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .matches(
        /^[A-Z][a-z]{2,14}$/,
        "name should be with min 3 char and max 15 char"
      ),
    email: yup.string().required("Email is required").email("email invalid"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password should match with this patern (M12345)"
      ),
    rePassword: yup
      .string()
      .required("password is required")
      .oneOf([yup.ref("password")], "rePassword dosnt match"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[1250][0-9]{8}$/, "phone invalid"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validate,
    onSubmit: SentRegisterDataToApi,
  });
  return (
    <>
      <div className=" w-75 mx-3">
        <h2>REGISTER NOW </h2>

        {errMessage ? (
          <div className=" alert alert-danger">{errMessage}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name"> name :</label>
          <input
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className=" pb-2 form-control "
          />
          {formik.errors.name && formik.touched.name ? (
            <div className=" alert alert-danger">{formik.errors.name}</div>
          ) : null}

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

          <label htmlFor="rePassword"> rePassword :</label>
          <input
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            className=" pb-2 form-control "
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className=" alert alert-danger">
              {formik.errors.rePassword}
            </div>
          ) : null}

          <label htmlFor="phone"> phone :</label>
          <input
            onBlur={formik.handleBlur}
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className=" pb-2 form-control "
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className=" alert alert-danger">{formik.errors.phone}</div>
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
