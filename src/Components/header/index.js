import React, {useEffect, useContext} from 'react';
import { Layout, Menu, message, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { FavContextcount } from "../favourites"

const { Header } =Layout;

const Head = () => {
  const navigate = useNavigate();
  var currentUser = JSON.parse(localStorage.getItem('loggedUser'));
  const favouritesCount= useContext(FavContextcount);
  console.log(favouritesCount);

      //----------------- LOAD FAVOURITE LIST -------------------

  useEffect(()=>{
    var favItems = JSON.parse(localStorage.getItem('FavItem'));
  },[])

    //----------------- SET NAVIGATION -------------------

    const homeNav = () => {
      navigate("/home");
    };
    const profileNav = () => {
      navigate("/profile");
    };

    const favNav =()=>{
      navigate("/favourites");
    }

   //--------------- LOGOUT ---------------
  
    const logout = () => {
      success();
      navigate("/login");
      localStorage.removeItem('loggedUser');
      localStorage.removeItem('FavItem');
      
    };

   //--------------- SUCCESS MESSAGE ---------------

  const success = () => {
    message.success("You've logged out, See you soon!!");
  };


  return <div>


            <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={{fontFamily: "cursive"}}>
        <Menu.Item key ="0" disabled>
           Hey {currentUser.displayname}
          </Menu.Item>
          <Menu.Item key="1" onClick={homeNav}>
            Home
          </Menu.Item>
          <Menu.Item key="2" onClick={favNav}>
              <Badge count={favouritesCount}>
           <Menu.Item>Favourites
          </Menu.Item>
          </Badge>      
          </Menu.Item> 
          <Menu.Item key="3" onClick={profileNav}>
            Profile
          </Menu.Item>
          <Menu.Item key="4" onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      </Layout>


  </div>
};

export default Head;
