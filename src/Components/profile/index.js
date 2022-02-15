import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, message, Layout, Card } from "antd";
import Head from "../header";

const Profile = () => {
  var logLocal = JSON.parse(localStorage.getItem("loggedUser"));  //fetch current user details
  const navigate = useNavigate();
  const [displayname, setDisplayname] = useState(null);
  const [password, setPassword] = useState(null);
  const _ = require("lodash");
  const [currentuser, setCurrentUser] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countryDetails, setCountryDetails] = useState();
  const [editsuccess, setEditsuccess] = useState(false);

  //--------------- GET CURRENT USER DETAILS ---------------

  const getUser = () => {
    let list = localStorage.getItem("users");
    if (list != null) {
      let data = JSON.parse(list);
      let userData = data.filter((item) => item.email == logLocal.email);
      setCurrentUser(userData);
      setDisplayname(userData[0]?.displayname);
      setPassword(userData[0]?.password);
      setCountryDetails(userData[0]?.country);
    }
  };

  //--------------- TRIGGER TO LOAD CURRENT USER  ---------------

  useEffect(() => {
    getUser();
  }, []);

  //--------------- EDIT USER DETAILS ---------------

  const editUser = (Name, Password) => {
    const namepattern = /^[a-zA-Z0-9]+$/;     //name &  password should not contain special char
    if (!Name) message.error("Display Name cannot be empty");
    else if (!namepattern.test(Password))
      message.error("Password should not contain special Characters");
    else if (!namepattern.test(Name))
      message.error("Display Name should not contain special Characters");
    else if (Password.length > 15)
      message.error("Password should not exceed 15 characters");
    else {
      let list = localStorage.getItem("users");
      if (list !== null) {
        let data = JSON.parse(list);
        var objIndex = data.findIndex((x) => x.email == logLocal.email);  //find Index of the current user
        data[objIndex].displayname = Name;
        data[objIndex].password = Password;
        localStorage.setItem("users", JSON.stringify(data));
        message.success("User details Updated, please Login!");
        setEditsuccess(true);
        if (setEditsuccess) {
          navigate("/login");
        }
      }
    }
  };

    //--------------- DELETE MODEL ---------------
    const showModal = () => {
      setIsModalVisible(true);
    };
    const handleOk = (email) => {
      deleteUser(email);
      setIsModalVisible(false);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };

  //--------------- Delete Current User Account ---------------

  const deleteUser = (email) => {
    let usersArr = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    var userIndex = usersArr.findIndex((x) => x.email == email);  //find index of current user
    usersArr.splice(userIndex, 1);
    localStorage.setItem("users", JSON.stringify(usersArr));   //set updated users data
    message.success(
      "You account has been deleted. You are always welcome to join us anytime."
    );
    navigate("/login");
  };

  return (
    <>
      <Layout>
        <Head />
      </Layout>
      {currentuser?.map((cuser, index) => {
        return (
          <div key={index} className="container">
            <h2>Hey {cuser.displayname}, Do you wish to Edit your details?</h2>
            <div className="row">
              <div className="col-25">
                <label> Email</label>
              </div>
              <div className="col-45">
                <input
                  type="text"
                  placeholder="Enter your Display Name"
                  defaultValue={cuser.email}
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label> Display Name</label>
              </div>
              <div className="col-45">
                <input
                  type="text"
                  placeholder="Enter your Display Name"
                  defaultValue={displayname}
                  onChange={(e) => setDisplayname(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label>Password</label>
              </div>
              <div className="col-45">
                <input
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <Button
                type="primary"
                onClick={() => editUser(displayname, password)}
              >
                Update
              </Button>
            </div>
            <div className="row">
              <Button type="danger" onClick={showModal}>
                Delete Account
              </Button>
            </div>
            <Modal
              title="Delete Account"
              visible={isModalVisible}
              onOk={() => handleOk(logLocal.email)}
              okText="Delete"
              onCancel={handleCancel}
            >
              <p>Are you sure you want to delete your account?</p>
            </Modal>
            <Layout>
              <h1 style={{ color: "#0b52bb" }}>Your Country</h1>
              <Card title={countryDetails} style={{ width: 440 }}></Card>
            </Layout>
          </div>
        );
      })}
    </>
  );
};

export default Profile;
