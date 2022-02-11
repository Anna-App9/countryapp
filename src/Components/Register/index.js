import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "antd";

const Register = () => {
  const [country, setCountry] = useState([]);
  const [usercountry, setuserCountry] = useState();
  const _ = require("lodash");

  // ------------------ LOAD LIST OF COUNTRIES ------------------
  const url ="https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson"
  useEffect(() => {
    axios.get(url).then((res) => {
      setCountry(res.data.countries);
    });
  }, []);
  
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [displayname, setDisplayname] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  
  const onChangeName = (e) => {
    setDisplayname(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeCpassword = (e) => {
    setCpassword(e.target.value);
  };
  const selectCountry = (e) => {
    setuserCountry(e);
  };

  //--------------- SUCCESS / ERROR MESSAGE ---------------
  const success = () => {
    message.success(
      "Congrats, your registration is successful. Please login now!"
    );
  };
  const error = () => {
    message.error("Email Already taken, please try another email!");
  };
  
  //--------------- REGISTRATION FORM SUBMIT HANDLER---------------
  const onSubmit = (e) => {
    if (!usercountry) {
      message.error("Please select a country");
    }
    if (usercountry) {
      let newData = {
        displayname: e.displayname,
        email: e.email,
        country: usercountry,
        password: e.password,
      };
      let newUser = localStorage.getItem("users");
      if (newUser === null) {
        localStorage.setItem("users", JSON.stringify([newData]));
        success();
        navigate("/login");
      } else {
        let userArr = JSON.parse(newUser);
        let dupUser = _.find(userArr, function(obj) {   //Check if email already taken
          if (obj.email == e.email) {
            return true;
          }
        });
        if (!dupUser) {
          userArr.push(newData);
          localStorage.setItem("users", JSON.stringify(userArr));
          success();
          navigate("/login");
        } else {
          error();
        }
      }
    }
  };

  return (
    <div className="reg-body">
      <h1 style={{ color: "#0b52bb"}}>
                COUNTRY APP SIGN UP
              </h1>
      <h3>Do you have an account?
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
      </h3>

      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 5 }}
        onFinish={onSubmit}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Display Name"
          name="displayname"
          value={displayname}
          onChange={onChangeName}
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "Display Name should not contain any special characters.",
            },
            { min: 3, message: "Display Name must contain min 3 characters" },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your Display Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          onChange={onChangeEmail}
          value={email}
          rules={[
            {
              required: true,
              message: "Please enter your Email ID",
            },
            {
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Please enter a valid Email",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your Email" />
        </Form.Item>
        <Form.Item 
        label="Country"
        name="country">
          <Select
            placeholder="Please select your country"
            onSelect={selectCountry}
            rules={[{ required: true, message: "Please select your country" }]}
          >
            {country.map((country, index) => {
              return (
                <Select.Option
                  rules={[
                    { required: true, message: "Please select your country" },
                  ]}
                  key={index}
                  value={country.name}
                >
                  {country.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          onChange={onChangePassword}
          value={password}
          rules={[
            {
              required: true,
              message: "Password is required",
            },
            { whitespace: true },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "Password should not contain any special characters.",
            },
            {
              min: 4,
              message: "Min 4 characters required",
            },
            {
              max: 15,
              message: "Max 15 characters only allowed",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your Password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="cpassword"
          value={cpassword}
          onChange={onChangeCpassword}
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please enter your password again",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match");
              },
            }),
          ]}
          hasFeedback
          style={{ color: "#fff" }}
        >
          <Input.Password placeholder="Confirm your Password" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 5, offset: 10 }}>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
