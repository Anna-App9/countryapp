import React, {useEffect, useState} from 'react';
import { Layout, Menu, message, Badge } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } =Layout;

const Head = () => {
  const navigate = useNavigate();
  var currentUser = JSON.parse(localStorage.getItem('loggedUser'));
  const [favCount,setFavCount] = useState();

      //----------------- LOAD FAVOURITE LIST -------------------

  useEffect(()=>{
    var favItems = JSON.parse(localStorage.getItem('FavItem'));
    if(favItems){
    var favlength = favItems.length;
    setFavCount(favlength)
    }
    else{
      setFavCount(0)
    }
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
          <Badge count={favCount}>
           <Menu.Item> Favourites</Menu.Item>
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
