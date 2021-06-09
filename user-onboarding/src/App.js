import "./App.css";
import Form from "./components/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import User from "./components/User";
import * as yup from "yup";
import schema from "./validation/formSchema";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  termsofservice: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  termsofservice: "",
};

const initialUsers = [];
const initialDisabled = true;

const API_URL = `https://reqres.in/api/users`;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    axios
      .get(API_URL)
      .then((res) => {
        const usersFromApi = res.data;
        setUsers(usersFromApi);
      })
      .catch((err) => console.log(err));
  };
  const postNewUser = (newUser) => {
    axios
      .post(API_URL, newUser)
      .then((res) => {
        setUsers([...users, newUser]);
      })
      .catch((err) => console.log(err))
      .finally(() => setFormValues(initialFormValues));
  };

  const formSubmit = () => {
    console.log("trying to submit the form");
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      // TermsOfService: [true, false].filter()
    };

    postNewUser(newUser);
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.message });
      });

    setFormValues({
      ...formValues,
      [name]: value, // NOT AN ARRAY, nice little syntax: dynamic property, computed property
    });
  };

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]); // dependencies array

  return (
    <div className="App">
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      <div className="user-container">
        {users.map((user) => {
          return (
            <User
              name={user.name}
              email={user.email}
              password={user.password}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
