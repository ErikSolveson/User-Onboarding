import React from "react";

export default function Form(props) {
  const { values, submit, change, disabled } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("this is the submit!");
    submit();
  };
  const onChange = (event) => {
    const { name, value, checked, type } = event.target;
    console.log("something changed!");
    change(name, value);
  };

  return (
    <form onSubmit={onSubmit}>
      <br />
      <label>
        Name&nbsp;
        <input
          value={values.name}
          onChange={onChange}
          type="text"
          name="name"
        />
      </label>

      <br />
      <label>
        Email&nbsp;
        <input
          value={values.email}
          onChange={onChange}
          type="text"
          name="email"
        />
      </label>

      <br />
      <label>
        Password&nbsp;
        <input
          value={values.password}
          onChange={onChange}
          type="text"
          name="password"
        />
      </label>

      <br />
      <label>
        Terms of Service&nbsp;
        <input
          checked={values.termsofservice}
          onChange={onChange}
          type="checkbox"
          name="TermsOfService"
        />
      </label>
      <button>submit</button>
    </form>
  );
}
// export default Form;
