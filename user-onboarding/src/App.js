import "./App.css";
import Form from "./components/Form";
import { useState } from "react";
import axios from "axios";
import User from "./components/User";

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
  const [formErros, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

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
      Name: formValues.name.trim(),
      Email: formValues.email.trim(),
      Password: formValues.password.trim(),
      // TermsOfService: [true, false].filter()
    };

    postNewUser(newUser);
  };

  const inputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value, // NOT AN ARRAY, nice little syntax: dynamic property, computed property
    });
  };

  return (
    <div className="App">
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
      />

      {users.map((user) => {
        return <User details={user} />;
      })}
    </div>
  );
}

export default App;
