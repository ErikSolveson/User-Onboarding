import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "name must be at least 2 letters"),
  email: yup
    .string()
    .email("must be a valid email address")
    .required("email is required"),
  password: yup.string().required("password is required"),
  termsofservice: yup.boolean(),
});

export default schema;
