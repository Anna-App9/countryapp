import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "antd";

const Register = () => {
  const [country, setCountry] = useState([]);
  const [usercountry,setuserCountry] = useState();

    // ------------------ Load List of Countries ------------------
    const url =
    "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson";
  useEffect(() => {
    axios.get(url).then((res) => {
      setCountry(res.data.countries);
      console.log('countries',res.data.countries);
    });
  }, []);


  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const navigate = useNavigate();

  const onChangeName = (e) => {
    setUsername(e.target.value);
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
    console.log(e);
  };

  const success = () => {
    message.success(
      "Congrats, your registration is successful. Please login now!"
    );
  };

  //---------------REGISTRATION FORM SUBMIT HANDLER---------------

  const onSubmit = (e) => {
    console.log(e);
    let newData = {
      username: e.username,
      email: e.email,
      country: usercountry,
      password: e.password,
      cpassword: e.cpassword,
    };
    console.log(newData);
    let newUser = localStorage.getItem("users");
    if (!newUser) {
      localStorage.setItem("users", JSON.stringify([newData]));
      success();
      navigate("/login");
    } else {
      let userArr = JSON.parse(newUser);

      userArr.map((arr) => {
        userArr.push(newData);
        localStorage.setItem("users", JSON.stringify(userArr));
      });
      success();
      navigate("/login");
    }
  };



  return (
    <div>
      <h3>
        Do you have an account?
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
          label="Username"
          name="username"
          value={username}
          onChange={onChangeName}
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "Username should not contain any special characters.",
            },
            { min: 3, message: "Username must contain min 3 characters" },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your Username" />
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
        <Form.Item>
          <Select
            placeholder="Please select your country"
            onSelect={selectCountry}
          >
            {
              country.map((country,index) => {
                return (
                <Select.Option key={index} value={country.name}>{country.name}</Select.Option>
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
            {
              min: 6,
              message: "Min 6 characters required",
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
