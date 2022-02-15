import React, { useState, createContext } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const _ = require("lodash");

  const onChangeEmail=(e)=>{
    setEmail(e.target.value)
  }
  const onChangePassword=(e)=>{
    setPassword(e.target.value)
  }

  //--------------- SUCCESS / ERROR MESSAGES ---------------

  const error = () => {
    message.error("Wrong Credentials, Please try again!");
  };
  const success = () => {
    message.success("Hey, Let's know the world better!");
  };


 //-------------- LOGIN FORM SUBMIT HANDLER ------------

 const onSubmit = (e) => {
  let userData = localStorage.getItem("users");
  let usersArray = JSON.parse(userData);
  let loggedUser = _.find(usersArray, function(obj) {  //Check if user exists
    if (obj.email == e.email && obj.password == e.password) {
        return true;
    }
  });
    if(loggedUser){
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));  //set loggedUser details
      success();
      navigate("/home");
    }else{
      error();
    }
};

  return (
    <div>
      <img
        align="left"
        src="https://media.istockphoto.com/photos/the-30-waving-flags-of-nato-countries-north-atlantic-treaty-isolated-picture-id1320096958?b=1&k=20&m=1320096958&s=170667a&w=0&h=fSwzXnCmXYwtcwNaszdoCDHnWlJ5vQcQKVtu3dUCzus="
      />
      <h1 style={{ color: "#0b52bb"}}>
                COUNTRY APP SIGN UP
              </h1>
      <h4>
        New Here? Please <Link to={"/register"}>Sign Up!</Link>
      </h4>
      <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            value={email}
            onChange={onChangeEmail}
            rules={[
              {required : true,
                message: "Please enter your password",
              },
              {
                pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message:"Please enter a valid email"
              }
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your Email-ID" />
          </Form.Item>
          
          <Form.Item
            label="Password"
            name="password"
            style={{ color: "#fff" }}
            value={password}
            onChange={onChangePassword}
            rules={[
              {required : true,
                message: "Please enter your password",
              }
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
          >
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
    </div>
  );
};

export default Login;
