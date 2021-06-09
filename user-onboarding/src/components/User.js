import React from "react";

export default function User(props) {
  const { name, email, password, termsofservice } = props;
  return (
    <div className="user">
      <p>Name: {name}</p>
      <p>email: {email}</p>
      <p>password: {password}</p>
    </div>
  );
}
