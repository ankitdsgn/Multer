import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

export const Register = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpw, setConfirmpw] = useState("");
  const [photo, setPhoto] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confirmpw", confirmpw);
    formData.append("photo", photo);

    if (password === confirmpw) {
      await axios
        .post("http://localhost:8000/register", formData)
        .then((datasent) => {
          console.log(datasent);
          navigate(`/`);
          alert("Success logging in");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("check confirm password");
    }
  };

  return (
    <>
      <form
        className="register-form"
        onSubmit={handlesubmit}
        encType="multipart/form-data"
      >
        <input
          type="file"
          name="photo"
          accept=".jpg"
          placeholder="upload your image"
          onChange={(e) => {
            const file = e.target.files[0];
            setPhoto(file);
          }}
        ></input>
        <input
          type="text"
          name="firstname"
          placeholder="type firstname"
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        ></input>
        <input
          type="text"
          name="username"
          placeholder="type username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="type password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        ></input>
        <input
          type="password"
          name="cpassword"
          placeholder="confirm password"
          onChange={(e) => {
            setConfirmpw(e.target.value);
          }}
          value={confirmpw}
        ></input>
        <button type="submit">Register</button>
      </form>
    </>
  );
};
